import { PlayerRecord } from '../types';
import { mockPlayers } from './mockPlayers';
import { configureSolver } from '..';

describe('Solver', () => {
  const solver = configureSolver();

  it('should return a valid response', async () => {
    const result = await solver(mockPlayers, 200000);
    expect(result).toBeDefined();
    expect(result.totalPoints).toBeGreaterThanOrEqual(0);
    expect(result.team).toHaveLength(5);
  });

  it('should correctly pick the best possible team when boundary is well above', async () => {
    const result = await solver(mockPlayers, 500000);
    expect(result).toBeDefined();
    expect(result.totalPoints).toEqual(171510);
    const expectedPlayers = ['Kareem Abdul-Jabbar', 'Karl Malone', 'Kobe Bryant', 'Michael Jordan', 'Dirk Nowitzki'];
    for (const playerName of expectedPlayers) {
      expect(result.team.some((player) => player.name === playerName)).toBe(true);
    }
  });

  it('should correctly replace player when picking one point below boundary', async () => {
    const result = await solver(mockPlayers, 171509);
    expect(result).toBeDefined();
    expect(result.totalPoints).toEqual(170037);
    const expectedPlayers = ['Kareem Abdul-Jabbar', 'Karl Malone', 'Kobe Bryant', 'Michael Jordan', 'LeBron James'];
    for (const playerName of expectedPlayers) {
      expect(result.team.some((player) => player.name === playerName)).toBe(true);
    }
  });

  it('should prefer players with less total games when total points are equal', async () => {
    const kareemAbdulJabbar = mockPlayers.find((p) => p.name === 'Kareem Abdul-Jabbar') as PlayerRecord;
    const modifiedPlayers = mockPlayers.map((p) =>
      p.name === 'Wilt Chamberlain' ? { ...p, total_points: kareemAbdulJabbar.total_points } : p,
    );
    const result = await solver(modifiedPlayers, 200000);
    expect(result).toBeDefined();
    const expectedPlayers = ['Wilt Chamberlain', 'Karl Malone', 'Kobe Bryant', 'Michael Jordan', 'Dirk Nowitzki'];
    for (const playerName of expectedPlayers) {
      expect(result.team.some((player) => player.name === playerName)).toBe(true);
    }
  });

  it('should prefer younger players when both total games and total points are equal', async () => {
    const kareemAbdulJabbar = mockPlayers.find((p) => p.name === 'Kareem Abdul-Jabbar') as PlayerRecord;
    const modifiedPlayers = mockPlayers.map((p) =>
      p.name === 'Wilt Chamberlain'
        ? { ...p, total_games: kareemAbdulJabbar.total_games, total_points: kareemAbdulJabbar.total_points }
        : p,
    );
    const result = await solver(modifiedPlayers, 200000);
    expect(result).toBeDefined();
    const expectedPlayers = ['Wilt Chamberlain', 'Karl Malone', 'Kobe Bryant', 'Michael Jordan', 'Dirk Nowitzki'];
    for (const playerName of expectedPlayers) {
      expect(result.team.some((player) => player.name === playerName)).toBe(true);
    }
  });
});
