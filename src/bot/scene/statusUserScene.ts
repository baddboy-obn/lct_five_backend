import {Action, Ctx, On, Scene, SceneEnter, SceneLeave} from 'nestjs-telegraf';
import { SceneEnum } from '../types/sceneEnum';
import { Context } from '../../interfaces/context.interface';
import { Markup } from 'telegraf';
import {Inject, NotFoundException} from '@nestjs/common';
import { UserService } from '../../user/user.service';

const sceneMarkup = Markup.inlineKeyboard(
  [
    Markup.button.callback('← Назад', 'back'),
  ],
  { columns: 1 },
);
@Scene(SceneEnum.STATUS_USER_SCENE.toString())
export class StatusUserScene {
  @Inject()
  private readonly userService: UserService;

  @SceneEnter()
  async onSceneEnter(ctx: Context) {
    await ctx.reply('Статус текущего пользователя', sceneMarkup);
  }

  @SceneLeave()
  async onSceneLeave(ctx: Context) {
    return 'Вышли из статуса 👋';
  }
  @On('message')
  async onMessage(@Ctx() ctx: Context) {

  }

  @Action('back')
  async actionBack(@Ctx() ctx: Context) {
    await ctx.scene.leave();
  }
}
