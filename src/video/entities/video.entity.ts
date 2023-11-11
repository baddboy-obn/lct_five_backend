import { IVideo } from '../interfaces/IVideo';
import {
  Column,
  CreateDateColumn, Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('video')
export class VideoEntity implements IVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  duration: number;

  @Column()
  hash: string;

  @Column()
  mimeType: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
