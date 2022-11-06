export const convertByteToUnit = (size: number): string => {
  const { target, unit } = getTarget(size);
  const newSize =
    target !== null ? Math.floor((size / target) * Math.pow(10, 2)) / Math.pow(10, 2) : size;

  return `${newSize} ${unit}`;
};

const getTarget = (size: number): { target: number | null; unit: string } => {
  const kb = 1024;
  const mb = Math.pow(kb, 2);
  const gb = Math.pow(kb, 3);
  const tb = Math.pow(kb, 4);

  if (size >= tb) return returnData(tb, 'TB');
  if (size >= gb) return returnData(gb, 'GB');
  if (size >= mb) return returnData(mb, 'MB');
  if (size >= kb) return returnData(kb, 'KB');

  return returnData(null, 'byte');
};

const returnData = (target: number | null, unit: string) => ({ target, unit });
