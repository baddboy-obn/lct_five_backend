import { ILinkUser } from '../interfaces/ILinkUser';
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import {TLinkStatus} from "../types/TLinkStatus";

@Entity('link-user')
export class LinkUserEntity implements ILinkUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @ManyToOne(() => UserEntity, (user) => user.links)
  @JoinColumn()
  forUser: UserEntity;

  @Column({ enum: TLinkStatus, default: TLinkStatus.NOT_USED})
  isUsed: TLinkStatus;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
