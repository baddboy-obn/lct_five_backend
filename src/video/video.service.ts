import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { VideoEntity } from './entities/video.entity';
import { UpdateVideoDto } from './dto/update.video.dto';
import { GetVideoDto } from './dto/get.video.dto';
import * as crypto from 'crypto';
import { S3Service } from '@appotter/nestjs-s3';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoEntityRepository: Repository<VideoEntity>,
    private readonly s3Service: S3Service,
  ) {}

  async getOne(id: number): Promise<VideoEntity> {
    return await this.videoEntityRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getOneByHash(hash: string): Promise<VideoEntity> {
    return await this.videoEntityRepository.findOne({
      where: {
        hash,
      },
    });
  }

  async getMany(ids: number[]): Promise<VideoEntity[]> {
    return await this.videoEntityRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getAll(): Promise<VideoEntity[]> {
    return await this.videoEntityRepository.find();
  }

  async setOne(data: UpdateVideoDto): Promise<VideoEntity> {
    return await this.videoEntityRepository.save(data);
  }

  async updateOne(
    data: GetVideoDto,
    update: UpdateVideoDto,
  ): Promise<VideoEntity> {
    const foundData = await this.getOne(data.id);
    const merged = await this.videoEntityRepository.merge(foundData, update);
    return await this.videoEntityRepository.save(merged);
  }

  async delOne(id: number): Promise<void> {
    const found = await this.getOne(id);
    await this.videoEntityRepository.remove(found);
  }

  public async uploadTemp(file) {
    if (!file) {
      throw new BadRequestException('Invalid file');
    }
    if (file.size === 0) {
      throw new BadRequestException('File is broken');
    }

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    return await this.s3Service.putAsUniqueName(file);
  }
}
