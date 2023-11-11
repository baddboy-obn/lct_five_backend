import { IUser } from '../interfaces/IUser';
import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatisticsEntity } from '../../statistics/entities/statistics.entity';
import {LinkUserEntity} from "../../link-user/entities/link.user.entity";

@Entity('user')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  telegramId: number;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => StatisticsEntity, (statistic) => statistic.owner)
  statistics: StatisticsEntity[];

  @OneToMany(() => LinkUserEntity, (link) => link.forUser)
  links: LinkUserEntity[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
