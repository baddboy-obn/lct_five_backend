import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  NotFoundException,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import {ApiBody, ApiConsumes, ApiOperation, ApiTags} from '@nestjs/swagger';
import { CreateVideoDto } from './dto/create.video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateVideoDto } from './dto/update.video.dto';

@ApiTags('ВИДЕО')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/by-id/:id')
  @ApiOperation({
    summary: 'Получить информацию о видео по id',
  })
  async getById(@Param('id') id: number) {
    return await this.videoService.getOne(id);
  }

  @Get('/by-hash/:id')
  @ApiOperation({
    summary: 'Получить информацию о видео по hash',
  })
  async getByHash(@Param('id') id: string) {
    return await this.videoService.getOneByHash(id);
  }

  @Post('/add')
  @ApiOperation({
    summary: 'Заисать данные о видео (опциональная история)',
  })
  async addVideo(@Body() data: CreateVideoDto) {
    return await this.videoService.setOne(data);
  }

  @Patch('/edit/:id')
  @ApiOperation({
    summary: 'Обновить данные о видео',
  })
  async editVideo(@Param('id') id, @Body() data: UpdateVideoDto) {
    const foundVideo = await this.videoService.getOne(id);
    if (!foundVideo) {
      throw new NotFoundException('Video is not found');
    }

    return await this.videoService.updateOne(foundVideo, data);
  }

  @Post('/upload')
  @ApiOperation({
    summary: 'Загрузить видео с последующей записью данных о нем в базу',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({
          //   fileType: '(video/quicktime|video/mp4|video/avi)',
          // }), // исправить типы
        ],
      }),
    )
    file,
  ) {
    const dataVideo = await this.videoService.uploadTemp(file);
    return await this.videoService.setOne({
      url: dataVideo.url,
      duration: 20,
      hash: Math.random().toString(36).substr(2),
      mimeType: file.mimetype,
    });
  }
}
