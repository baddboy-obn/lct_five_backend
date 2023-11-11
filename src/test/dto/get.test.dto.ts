import { ITest } from '../interfaces/ITest';
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber, IsString } from 'class-validator';

export class GetTestDto implements ITest {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsJSON()
  structure: any;
}
