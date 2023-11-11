import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsEntity } from './entities/statistics.entity';
import { UserModule } from '../user/user.module';
import { TestModule } from '../test/test.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatisticsEntity]),
    UserModule,
    TestModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
