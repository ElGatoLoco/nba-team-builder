import { processPlayerName } from '../utils/processPlayerName';
import { safeParseInt } from '../utils/safeParseInt';

type StatCSVRecord = {
  Player: string;
  Pos: string;
  Year: string;
  Age: string;
  PTS: string;
  G: string;
};
type Stat = {
  player: string;
  position: string;
  season: number;
  age?: number;
  gamesPlayed: number;
  points: number;
};

type TransformStatRecord = (row: StatCSVRecord) => Stat;
export const transformStatRecord: TransformStatRecord = (row) => ({
  player: processPlayerName(row.Player) || '',
  position: processPlayerName(row.Pos) || '',
  season: safeParseInt(row.Year) || 0,
  age: safeParseInt(row.Age) || 0,
  gamesPlayed: safeParseInt(row.G) || 0,
  points: safeParseInt(row.PTS) || 0,
});
