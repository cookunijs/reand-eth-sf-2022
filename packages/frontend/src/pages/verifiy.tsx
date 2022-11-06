import type { GetServerSideProps, NextPage } from 'next';
import { Verifiy, VerifiyProps } from '@components/templates/Verifiy';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = {
    worldId: true,
    polygonId: {
      req: {
        Test: {
          $eq: 1,
        },
      },
      schema: {
        url: 'https://s3.eu-west-1.amazonaws.com/polygonid-schemas/dd79a18f-2a63-4435-b27c-5e89109ebd2d.json-ld',
        type: 'Reand',
      },
    },
  };
  return {
    props: { pageContext: data },
  };
};

const VerifiyPage: NextPage<VerifiyProps> = ({ pageContext }) => {
  return <Verifiy pageContext={pageContext} />;
};

export default VerifiyPage;
