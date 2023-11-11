import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { AddUserScene } from './scene/addUserScene';
import { UserModule } from '../user/user.module';
import { EditUserScene } from './scene/editUserScene';
import { LinkUserModule } from '../link-user/link-user.module';
import { StatusUserScene } from './scene/statusUserScene';
import { TestModule } from '../test/test.module';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [UserModule, LinkUserModule, TestModule, StatisticsModule],
  providers: [BotService, AddUserScene, EditUserScene, StatusUserScene],
})
export class BotModule {}
