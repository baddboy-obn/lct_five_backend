import { IVideo } from '../interfaces/IVideo';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVideoDto implements Omit<IVideo, 'id'> {
  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsString()
  mimeType: string;

  @ApiProperty()
  @IsString()
  url: string;
}
