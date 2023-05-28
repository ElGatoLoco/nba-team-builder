export const safeParseInt = (val: string) => {
  const parsed = parseInt(val);
  if (!isNaN(parsed)) {
    return parsed;
  }
};
