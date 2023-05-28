import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { StatisticEntity } from './statistic.entity';

@Entity('players')
@Index(['name', 'born'], { unique: true })
export class PlayerEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  position: string;

  @Column({ name: 'year_start', type: 'smallint', nullable: true })
  yearStart: number;

  @Column({ name: 'year_end', type: 'smallint', nullable: true })
  yearEnd: number;

  @Column({ type: 'smallint', nullable: true })
  height: number;

  @Column({ type: 'smallint', nullable: true })
  weight: number;

  @Column({ nullable: true })
  college: string;

  @Column({ type: 'smallint', nullable: true })
  born: number;

  @Column({ name: 'birth_city', nullable: true })
  birthCity: string;

  @Column({ name: 'birth_state', nullable: true })
  birthState: string;

  @OneToMany(() => StatisticEntity, (s) => s.player)
  statistics: StatisticEntity[];
}
