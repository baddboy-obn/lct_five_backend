import { IUser } from '../interfaces/IUser';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto implements Omit<IUser, 'id'> {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsNumber()
  chatId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  telegramId?: number;

  @ApiProperty({ default: 'mail@mail.ru' })
  @IsEmail()
  email: string;
}
