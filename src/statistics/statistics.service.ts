import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { StatisticsEntity } from './entities/statistics.entity';
import { CreateStatisticsDto } from './dto/create.statistics.dto';
import { GetStatisticsDto } from './dto/get.statistics.dto';
import { UpdateStatisticsDto } from './dto/update.statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(StatisticsEntity)
    private statisticsEntityRepository: Repository<StatisticsEntity>,
  ) {}

  async getOne(id: number): Promise<StatisticsEntity> {
    return await this.statisticsEntityRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getByUser(id: number): Promise<StatisticsEntity[]> {
    return await this.statisticsEntityRepository.find({
      where: {
        owner: {
          id,
        },
      },
      relations: ['test'],
    });
  }

  async getByUserAndTest(
    ownerId: number,
    testId: number,
  ): Promise<StatisticsEntity> {
    return await this.statisticsEntityRepository.findOne({
      where: {
        owner: {
          id: ownerId,
        },
        test: {
          id: testId,
        },
      },
    });
  }

  async getMany(ids: number[]): Promise<StatisticsEntity[]> {
    return await this.statisticsEntityRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async setOne(data: CreateStatisticsDto): Promise<StatisticsEntity> {
    return await this.statisticsEntityRepository.save(data);
  }

  async updateOne(
    data: GetStatisticsDto,
    update: UpdateStatisticsDto,
  ): Promise<StatisticsEntity> {
    const foundData = await this.getOne(data.id);
    const merged = await this.statisticsEntityRepository.merge(
      foundData,
      update,
    );
    return await this.statisticsEntityRepository.save(merged);
  }

  async delOne(id: number): Promise<void> {
    const found = await this.getOne(id);
    await this.statisticsEntityRepository.remove(found);
  }
}
