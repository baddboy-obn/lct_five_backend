import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';
import { In, Repository } from 'typeorm';
import { CreateTestDto } from './dto/create.test.dto';
import { GetTestDto } from './dto/get.test.dto';
import { UpdateTestDto } from './dto/update.test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private testEntityRepository: Repository<TestEntity>,
  ) {}

  async getOne(id: number): Promise<TestEntity> {
    return await this.testEntityRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getMany(ids: number[]): Promise<TestEntity[]> {
    return await this.testEntityRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getAll() {
    return await this.testEntityRepository.find();
  }
  async setOne(data: CreateTestDto): Promise<TestEntity> {
    return await this.testEntityRepository.save(data);
  }

  async updateOne(
    data: GetTestDto,
    update: UpdateTestDto,
  ): Promise<TestEntity> {
    const foundData = await this.getOne(data.id);
    const merged = await this.testEntityRepository.merge(foundData, update);
    return await this.testEntityRepository.save(merged);
  }

  async delOne(id: number): Promise<void> {
    const found = await this.getOne(id);
    await this.testEntityRepository.remove(found);
  }
}
