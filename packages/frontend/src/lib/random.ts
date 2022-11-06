export const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateRandomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
