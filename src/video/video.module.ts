import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { S3Module, S3Service } from '@appotter/nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity]),
    S3Module.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          bucket: configService.get('S3_BUCKET_NAME'),
          region: 'ru-central1',
          endpoint: configService.get('S3_ENDPOINT'),
        };
      },
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
