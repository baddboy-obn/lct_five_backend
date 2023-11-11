import { ITest } from '../interfaces/ITest';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class UpdateTestDto implements Omit<ITest, 'id'> {
  @ApiPropertyOptional({
    description: 'Любая json структура'
  })
  @IsObject()
  structure: any;

  @ApiPropertyOptional()
  @IsString()
  name: string;
}
