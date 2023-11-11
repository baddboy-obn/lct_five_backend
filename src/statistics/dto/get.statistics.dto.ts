import { IStatistics } from '../interfaces/IStatistics';
import {ApiProperty} from "@nestjs/swagger";
import {GetUserDto} from "../../user/dto/get.user.dto";
import {TStatus} from "../types/TStatus";
import {GetTestDto} from "../../test/dto/get.test.dto";
import {IsNumber, IsObject} from "class-validator";

export class GetStatisticsDto implements IStatistics {
  @ApiProperty()
  id: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  step: number;

  @ApiProperty()
  @IsObject()
  statistics: any;

  @ApiProperty({ type: () => GetUserDto })
  owner: GetUserDto;

  @ApiProperty({ type: 'enum', enum: TStatus })
  status: TStatus;

  @ApiProperty({ type: () => GetTestDto })
  test: GetTestDto;
}
