import { nanoid } from 'nanoid';

export const generateRandomId = (length: number): string => {
  return nanoid(length);
};
