import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @ApiOperation({
    summary: 'Все пользователи системы',
  })
  async listUsers() {
    return await this.userService.getAll();
  }

  @Get('/one/:id')
  @ApiOperation({
    summary: 'Пользователь по иднетификатору',
  })
  async getOneById(@Param('id') id: number) {
    return await this.userService.getOne(id);
  }

  @Get('/statistics/:id')
  @ApiOperation({
    summary: 'Статистика по пользователю',
  })
  async getStatisticsByOwnerId(@Param('id') id: number) {
    return await this.userService.getStatisticsByOwnerOne(id);
  }

  @Get('/one/:id')
  @ApiOperation({
    summary: 'Все пользователи системы',
  })
  async getOne(@Param('id') id: number) {
    return await this.userService.getOne(id);
  }

  @Post('/add')
  @ApiOperation({
    summary: 'Добавить нового пользователя',
  })
  async addUser(@Body() data: CreateUserDto) {
    return await this.userService.setOne(data);
  }

  @Patch('/edit')
  @ApiOperation({
    summary: 'Обновить нового пользователя',
  })
  async editUser(@Query() id: number, @Body() data: UpdateUserDto) {
    const foundUser = await this.userService.getOne(id);
    if (!foundUser) {
      throw new NotFoundException('User is not found');
    }
    return await this.userService.updateOne(foundUser, data);
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Удалить пользователя',
  })
  async delUser(@Param('id') id: number) {
    return await this.userService.delOne(id);
  }
}
