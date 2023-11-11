import { ITest } from '../interfaces/ITest';
import {
  Column,
  CreateDateColumn, Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatisticsEntity } from '../../statistics/entities/statistics.entity';

@Entity('test')
export class TestEntity implements ITest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Простой тест' })
  name: string;

  @Column({ type: 'simple-json' })
  structure: any;

  @OneToMany(() => StatisticsEntity, (statistics) => statistics.test)
  statistics: StatisticsEntity[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
