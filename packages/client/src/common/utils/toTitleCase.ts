type ToTitle = (s: string) => string;
export const toTitleCase: ToTitle = (s) => {
  const res = s.replace(/([A-Z])/g, ' $1');
  return res.charAt(0).toUpperCase() + res.slice(1);
};
