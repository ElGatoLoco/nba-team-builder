import { safeParseInt } from './safeParseInt';

export const extractYearFromDateString = (dateString: string) => {
  return safeParseInt(dateString.slice(-4));
};
