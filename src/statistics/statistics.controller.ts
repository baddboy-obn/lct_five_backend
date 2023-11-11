import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStatisticsDto } from './dto/create.statistics.dto';
import { UpdateStatisticsDto } from './dto/update.statistics.dto';
import { UserService } from '../user/user.service';
import { TestService } from '../test/test.service';

@ApiTags('Статистика')
@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly userService: UserService,
    private readonly testService: TestService,
  ) {}

  @Get('/one/:id')
  @ApiOperation({
    summary: 'Статистика по пользователю',
  })
  async getByUser(@Param('id') id: number) {
    return await this.statisticsService.getByUser(id);
  }

  @Post('/add')
  @ApiOperation({
    summary: 'Добавить статистику',
  })
  async addStatistics(@Body() data: CreateStatisticsDto) {
    const foundStatistics = await this.statisticsService.getByUserAndTest(
      data.ownerId,
      data.testId,
    );

    if (foundStatistics) {
      throw new BadRequestException(
        'Добавить статистику к уже сущесвуюзей записи нельзя, можно только обновлять',
      );
    }

    if (data.ownerId) {
      data.owner = await this.userService.getOne(data.ownerId);
    }

    if (data.testId) {
      data.test = await this.testService.getOne(data.testId);
    }

    await this.statisticsService.setOne(data);
  }

  @Patch('/edit/:id')
  @ApiOperation({
    summary: 'Обновить статистику',
  })
  async editStatistics(
    @Param('id') id: number,
    @Body() data: UpdateStatisticsDto,
  ) {
    const foundStatistics = await this.statisticsService.getOne(id);
    if (!foundStatistics) {
      throw new NotFoundException('Не найдено');
    }

    if (data.ownerId) {
      data.owner = await this.userService.getOne(data.ownerId);
    }

    if (data.testId) {
      data.test = await this.testService.getOne(data.testId);
    }

    return await this.statisticsService.updateOne(foundStatistics, data);
  }
}
