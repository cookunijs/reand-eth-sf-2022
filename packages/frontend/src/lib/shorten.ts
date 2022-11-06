export const shorten = (raw: string, length: number): string => {
  if (raw.length > length) {
    const rawSubstring = raw.substring(0, length);
    return `${rawSubstring}...`;
  }
  return raw;
};

export const shortenAddress = (address: string): string => {
  if (typeof window === 'undefined') return '';
  if (address.length > length) {
    const frontAddressSubstring = address.substring(0, 6);
    const backAddressSubstring = address.substring(address.length - 4);
    return `${frontAddressSubstring}...${backAddressSubstring}`;
  }
  return address;
};
