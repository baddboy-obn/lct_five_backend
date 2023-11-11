import { IStatistics } from '../interfaces/IStatistics';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetUserDto } from '../../user/dto/get.user.dto';
import { Optional } from '@nestjs/common';
import { TStatus } from '../types/TStatus';
import { GetTestDto } from '../../test/dto/get.test.dto';
import {IsNumber, IsObject, IsOptional} from 'class-validator';

export class CreateStatisticsDto implements Omit<IStatistics, 'id'> {
  @ApiProperty({ default: 1 })
  @IsNumber()
  step: number;

  // @ApiProperty({ type: () => GetUserDto })
  @ApiProperty()
  @IsNumber()
  ownerId: number;

  owner: GetUserDto;

  @ApiPropertyOptional({
    description:
      'Сюда записываем ответы и статистику по просмотам видео (JSON любой)',
  })
  @IsObject()
  @IsOptional()
  statistics: any;

  @ApiProperty({ type: 'enum', enum: TStatus })
  status: TStatus;

  // @ApiProperty({ type: () => GetTestDto })
  @ApiProperty()
  @IsNumber()
  testId: number;

  test: GetTestDto;
}
