import {Action, Ctx, On, Scene, SceneEnter, SceneLeave} from 'nestjs-telegraf';
import { SceneEnum } from '../types/sceneEnum';
import { Context } from '../../interfaces/context.interface';
import { Markup } from 'telegraf';
import { Inject } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { LinkUserService } from '../../link-user/link-user.service';
import { GetUserDto } from '../../user/dto/get.user.dto';

const sceneMarkup = Markup.inlineKeyboard(
  [
    Markup.button.callback('Статус пользователя', 'userstatus'),
    Markup.button.callback('← Назад', 'back'),
  ],
  { columns: 1 },
);

const sceneBack = Markup.inlineKeyboard(
  [Markup.button.callback('← Назад', 'back')],
  { columns: 1 },
);
@Scene(SceneEnum.ADD_USER_SCENE.toString())
export class AddUserScene {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly linkUserService: LinkUserService;


  @SceneEnter()
  async onSceneEnter(ctx: Context) {
    await ctx.reply('Введите хеш строку полученную от HR специалиста');
  }

  @SceneLeave()
  onSceneLeave() {
    return 'Вышли из добавдения 👋';
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    const foundLink = await this.linkUserService.getByHash(ctx.message['text']);

    if (!foundLink) {
      await ctx.reply('Строка не найдена');
    } else {
      const foundUser = await this.userService.getByChatId(ctx.message.chat.id);

      if (!foundUser) {
        await this.userService.updateOne(foundLink.forUser as GetUserDto, {
          chatId: ctx.message.chat.id,
          telegramId: ctx.from.id,
        });
        await ctx.reply('Пользователь привязан', sceneBack);
        await this.linkUserService.disableLink(foundLink);
      } else {
        await ctx.reply('Пользователь уже был привязан', sceneBack);
      }
    }
  }

  @Action('back')
  async actionBack(@Ctx() ctx: Context) {
    await ctx.scene.leave();
  }
}
