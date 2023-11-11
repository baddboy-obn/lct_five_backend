import { IUser } from '../interfaces/IUser';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Omit<IUser, 'id'> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsNumber()
  chatId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  telegramId?: number;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;
}
