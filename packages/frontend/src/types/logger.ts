export const LogLevel = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

export interface Payload {
  [key: string]: any;
}
