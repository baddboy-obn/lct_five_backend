import { ILinkUser } from '../interfaces/ILinkUser';
import { GetUserDto } from '../../user/dto/get.user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TLinkStatus } from '../types/TLinkStatus';

export class CreateLinkUserDto implements Omit<ILinkUser, 'id'> {
  @ApiProperty({ type: () => GetUserDto})
  forUser: GetUserDto;

  @ApiProperty({ enum: TLinkStatus, default: TLinkStatus.NOT_USED })
  @IsEnum(TLinkStatus)
  isUsed: TLinkStatus;

  @ApiProperty()
  @IsString()
  hash: string;
}
