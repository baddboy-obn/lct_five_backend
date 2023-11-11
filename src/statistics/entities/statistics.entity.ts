import { IStatistics } from '../interfaces/IStatistics';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TStatus } from '../types/TStatus';
import { TestEntity } from '../../test/entities/test.entity';

@Entity('statistics')
export class StatisticsEntity implements IStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  step: number;

  @Column({ type: 'simple-json', nullable: true })
  statistics: any;

  @ManyToOne(() => UserEntity, (user) => user.statistics)
  @JoinColumn()
  owner: UserEntity;

  @Column({ type: 'enum', enum: TStatus, default: TStatus.START })
  status: TStatus;

  @ManyToOne(() => TestEntity, (test) => test.statistics)
  @JoinColumn()
  test: TestEntity;
}
