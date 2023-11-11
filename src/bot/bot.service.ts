import { Action, Command, InjectBot, Start, Update, On } from 'nestjs-telegraf';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Markup, Telegraf, Telegram } from 'telegraf';
import { Context } from '../interfaces/context.interface';
import { BotName, startText } from '../constants';
// import { startMarkup } from './markups/startMarkups';
import { SceneEnum } from './types/sceneEnum';

import * as process from 'process';
import { Inject } from '@nestjs/common';
import { TestService } from '../test/test.service';
import { StatisticsService } from '../statistics/statistics.service';
import { UserService } from '../user/user.service';

export const startMarkup = Markup.inlineKeyboard(
  [
    Markup.button.callback('Привязать пользователя', 'adduser'),
    Markup.button.callback('Статус пользователя', 'userstatus'),
    Markup.button.callback('Тесты пользователя', 'usertests'),
  ],

  { columns: 1 },
);

@Update()
export class BotService {
  private readonly thisBot: Telegram = new Telegram(process.env.BOT_TOKEN);
  private chatId: number;
  constructor(@InjectBot(BotName) private bot: Telegraf<Context>) {}

  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly testService: TestService;
  @Inject()
  private readonly statisticsService: StatisticsService;

  @Start()
  async onStart(ctx: Context) {
    this.chatId = ctx.message.chat.id;
    await ctx.reply(startText, startMarkup);
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async onUpdate() {
  //   const foundUser = await this.userService.getByChatId(this.chatId);
  //   console.log(foundUser.id)
  //
  //   const foundStatistics = await this.statisticsService.getByUser(
  //     foundUser.id,
  //   );
  //   console.log(foundStatistics);
  //   await this.bot.telegram.sendMessage(184442634, '123');
  // }

  @Action('adduser')
  // @UseGuards(AdminGuard)
  async onAddUser(ctx: Context) {
    await ctx.scene.enter(SceneEnum.ADD_USER_SCENE.toString());
  }

  @Action('userstatus')
  // @UseGuards(AdminGuard)
  async onUserStatus(ctx: Context) {
    await ctx.scene.enter(SceneEnum.STATUS_USER_SCENE.toString());
  }
}
