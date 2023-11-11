import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneEnum } from '../types/sceneEnum';
import { Context } from '../../interfaces/context.interface';
import { Markup } from 'telegraf';
import { Inject } from '@nestjs/common';
import { UserService } from '../../user/user.service';

const sceneMarkup = Markup.inlineKeyboard(
  [
    Markup.button.callback('← Назад', 'back'),
  ],
  { columns: 1 },
);
@Scene(SceneEnum.EDIT_USER_SCENE.toString())
export class EditUserScene {
  @Inject()
  private readonly userService: UserService;
  @Action('start')
  @SceneEnter()
  async onSceneEnter(ctx: Context) {
    await ctx.reply('Введите почту пользователя');
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!expression.test(ctx.message['text'])) {
      await ctx.reply('Почта введена не корректно');
    }

    const foundUser = await this.userService.getOneByEmail(ctx.message['text']);
    if (!foundUser) {
      // throw new NotFoundException('Пользовательно не найден');
      await ctx.reply('Пользотватель не найден', sceneMarkup);
    }
  }
}
