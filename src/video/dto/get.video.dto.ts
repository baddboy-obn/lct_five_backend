import { IVideo } from '../interfaces/IVideo';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetVideoDto implements IVideo {
  @ApiProperty()
  @IsNumber()
  id: number;

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
