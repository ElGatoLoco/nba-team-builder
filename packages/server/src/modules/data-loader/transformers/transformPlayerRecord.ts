import { processPlayerName } from '../utils/processPlayerName';
import { safeParseInt } from '../utils/safeParseInt';
import { Player } from './types';

type PlayerCSVRecord = {
  Player: string;
  height: string;
  weight: string;
  collage: string;
  born: string;
  birth_city: string;
  birth_state: string;
};

type TransformPlayerRecord = (row: PlayerCSVRecord) => Player;
export const transformPlayerRecord: TransformPlayerRecord = (row) => ({
  name: processPlayerName(row.Player),
  height: safeParseInt(row.height),
  weight: safeParseInt(row.weight),
  college: row.collage,
  born: safeParseInt(row.born),
  birthCity: row.birth_city,
  birthState: row.birth_state,
});
