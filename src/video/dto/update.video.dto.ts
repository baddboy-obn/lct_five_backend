import { IVideo } from '../interfaces/IVideo';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateVideoDto implements Omit<IVideo, 'id'> {
  @ApiPropertyOptional()
  @IsNumber()
  duration: number;

  @ApiPropertyOptional()
  @IsString()
  hash: string;

  @ApiPropertyOptional()
  @IsString()
  mimeType: string;

  @ApiPropertyOptional()
  @IsString()
  url: string;
}
