import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './middleware/session.middleware';
import { BotModule } from './bot/bot.module';
import { BotName } from './constants';
import { StatisticsModule } from './statistics/statistics.module';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { TestEntity } from './test/entities/test.entity';
import { StatisticsEntity } from './statistics/entities/statistics.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { VideoModule } from './video/video.module';
import { VideoEntity } from './video/entities/video.entity';
import { LinkUserModule } from './link-user/link-user.module';
import { LinkUserEntity } from './link-user/entities/link.user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TelegrafModule.forRootAsync({
      // imports: undefined,
      botName: BotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [BotModule],
        // launchOptions: {
        //   webhook: {
        //     domain: 'http://localhost:3000',
        //     hookPath: '/bot',
        //   },
        // },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: configService.get('PG_PORT'),
          username: configService.get('PG_USERNAME'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DBNAME'),
          entities: [
            StatisticsEntity,
            TestEntity,
            UserEntity,
            VideoEntity,
            LinkUserEntity,
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    BotModule,
    StatisticsModule,
    TestModule,
    UserModule,
    VideoModule,
    LinkUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
