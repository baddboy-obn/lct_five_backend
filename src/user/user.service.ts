import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {UserEntity} from './entities/user.entity';
import {CreateUserDto} from './dto/create.user.dto';
import {GetUserDto} from './dto/get.user.dto';
import {UpdateUserDto} from './dto/update.user.dto';
import {LinkUserService} from "../link-user/link-user.service";
import {TLinkStatus} from "../link-user/types/TLinkStatus";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    private readonly linkUserService: LinkUserService
  ) {}

  async getOne(id: number): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({
      where: {
        id,
      },
      relations: ['statistics.test', 'links'],
    });
  }

  async getStatisticsByOwnerOne(id: number): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({
      where: {
        id,
      },
      relations: ['statistics.test', 'links'],
    });
  }

  async getByChatId(chatId: number) {
    return await this.userEntityRepository.findOne({
      where: {
        chatId,
      },
    });
  }

  async getOneByEmail(email: string) {
    return await this.userEntityRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getMany(ids: number[]): Promise<UserEntity[]> {
    return await this.userEntityRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userEntityRepository.find();
  }

  async setOne(data: CreateUserDto): Promise<UserEntity> {
    const created = await this.userEntityRepository.save(data);
    await this.linkUserService.addLink({
      forUser: created,
      hash: '111',
      isUsed: TLinkStatus.NOT_USED,
    })
    return created;
  }

  async updateOne(
    data: GetUserDto,
    update: UpdateUserDto,
  ): Promise<UserEntity> {
    const foundData = await this.getOne(data.id);
    const merged = await this.userEntityRepository.merge(foundData, update);
    return await this.userEntityRepository.save(merged);
  }

  async delOne(id: number): Promise<void> {
    const found = await this.getOne(id);
    await this.userEntityRepository.remove(found);
  }
}
