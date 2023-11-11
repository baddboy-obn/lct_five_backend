import { ITest } from '../interfaces/ITest';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CreateTestDto implements Omit<ITest, 'id'> {
  @ApiProperty({
    description: 'Любая json структура'
  })
  @IsObject()
  structure: any;

  @ApiProperty()
  @IsString()
  name: string;
}
