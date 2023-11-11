import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkUserEntity } from './entities/link.user.entity';
import { CreateLinkUserDto } from './dto/create.link.user.dto';
import { GetLinkUserDto } from './dto/get.link.user.dto';
import { UpdateUserDto } from '../user/dto/update.user.dto';
import { TLinkStatus } from './types/TLinkStatus';

@Injectable()
export class LinkUserService {
  constructor(
    @InjectRepository(LinkUserEntity)
    private linkUserEntityRepository: Repository<LinkUserEntity>,
  ) {}

  async getByHash(hash: string) {
    return await this.linkUserEntityRepository.findOne({
      where: {
        hash,
      },
      relations: ['forUser'],
    });
  }

  async addLink(data: CreateLinkUserDto) {
    return await this.linkUserEntityRepository.save(data);
  }

  async updateLink(found: GetLinkUserDto) {
    const foundData = await this.linkUserEntityRepository.findOne({
      where: {
        id: found.id,
      },
    });
    const merged = await this.linkUserEntityRepository.merge(foundData, {
      isUsed: TLinkStatus.USED,
    });
    return await this.linkUserEntityRepository.save(merged);
  }

  async disableLink(found: GetLinkUserDto) {
    return await this.updateLink(found)
  }
}
