import { IStatistics } from '../interfaces/IStatistics';
import { GetUserDto } from '../../user/dto/get.user.dto';
import { TStatus } from '../types/TStatus';
import { GetTestDto } from '../../test/dto/get.test.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class UpdateStatisticsDto implements Omit<IStatistics, 'id'> {
  @ApiProperty({ default: 1 })
  @IsNumber()
  step: number;

  // @ApiPropertyOptional({ type: () => GetUserDto })
  // @Optional()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  ownerId: number;

  owner: GetUserDto;

  @ApiPropertyOptional({
    description:
      'Сюда записываем ответы и статистику по просмотам видео (JSON любой)',
  })
  @IsObject()
  statistics: any;

  @ApiPropertyOptional({ type: 'enum', enum: TStatus })
  @Optional()
  status: TStatus;

  // @ApiPropertyOptional({ type: () => GetTestDto })
  // @Optional()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  testId: number;
  test: GetTestDto;
}
