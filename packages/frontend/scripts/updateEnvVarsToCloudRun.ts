import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const SERVICE_NAME = 'renderer';

const execCommand = (command: string) => {
  console.log(command);
  return execSync(command, { stdio: 'inherit' });
};

const main = async () => {
  const env = process.argv[2];
  if (!env)
    throw new Error('You must pass env like `npx ts-node scripts/updateEnvVarsToCloudRun.ts env`');

  const envFileString = fs.readFileSync(path.resolve(__dirname, `../env/.env.${env}`)).toString();
  const envVars = envFileString
    .split('\n')
    .filter(str => str.length > 0)
    .map(vars => ({
      key: vars.split('=')[0],
      value: vars.split('=').slice(1, vars.split('=').length).join('='),
    }));
  const projectID = envVars.find(vars => vars.key.startsWith('NEXT_PUBLIC_PROJECT_ID'))!.value;
  execCommand(
    `gcloud run services update ${SERVICE_NAME} --platform managed --region asia-northeast1 --project ${projectID} --update-env-vars=${envVars
      .map(vars => `${vars.key}="${vars.value}"`)
      .join(',')}`
  );
};

main();
