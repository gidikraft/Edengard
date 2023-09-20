export const formatEllipseText = (str: string, len: number) => {
  if (str.length > len) {
    str = str.substring(0, len) + "...";
  }
  return str;
};
