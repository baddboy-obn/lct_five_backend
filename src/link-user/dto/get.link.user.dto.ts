import { ILinkUser } from '../interfaces/ILinkUser';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetUserDto } from '../../user/dto/get.user.dto';
import { IsEnum, IsString } from 'class-validator';
import { TLinkStatus } from '../types/TLinkStatus';

export class GetLinkUserDto implements ILinkUser {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: () => GetUserDto })
  forUser: GetUserDto;

  @ApiProperty({ enum: TLinkStatus, default: TLinkStatus.NOT_USED })
  @IsEnum(TLinkStatus)
  isUsed: TLinkStatus;

  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  updateAt: Date;
}
