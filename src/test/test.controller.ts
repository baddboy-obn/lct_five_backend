import { Body, Controller, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTestDto } from './dto/create.test.dto';

@ApiTags('Тесты')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('/add')
  @ApiOperation({
    summary: 'Добавить тест',
  })
  async addTest(@Body() data: CreateTestDto) {
    await this.testService.setOne(data);
  }
}
