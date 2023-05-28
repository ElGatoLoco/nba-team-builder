import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { PlayerEntity } from './player.entity';

@Entity('statistics')
export class StatisticEntity extends BaseEntity {
  @ManyToOne(() => PlayerEntity, (p) => p.name, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'player_name', referencedColumnName: 'name' })
  player: string;

  @Column({ type: 'smallint' })
  season: number;

  @Column()
  position: string;

  @Column({ type: 'smallint' })
  age: number;

  @Column({ name: 'games_played', type: 'smallint' })
  gamesPlayed: number;

  @Column({ type: 'smallint' })
  points: number;
}
