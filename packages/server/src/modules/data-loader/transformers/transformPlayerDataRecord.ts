import { extractYearFromDateString } from '../utils/extractYearFromDateString';
import { processPlayerName } from '../utils/processPlayerName';
import { safeParseInt } from '../utils/safeParseInt';
import { Player } from './types';

type PlayerDataCSVRecord = {
  name: string;
  position: string;
  year_start: string;
  year_end: string;
  birth_date: string;
  college: string;
};

type TransformPlayerDataRecord = (row: PlayerDataCSVRecord) => Player;
export const transformPlayerDataRecord: TransformPlayerDataRecord = (row) => ({
  name: processPlayerName(row.name),
  position: row.position,
  yearStart: safeParseInt(row.year_start),
  yearEnd: safeParseInt(row.year_end),
  born: extractYearFromDateString(row.birth_date),
  college: row.college,
});
