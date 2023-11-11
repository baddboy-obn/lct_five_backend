import { Markup, Telegraf } from 'telegraf';
export const startMarkup = Markup.inlineKeyboard(
  [Markup.button.callback('Зарегистрировать пользователя', 'adduser'), Markup.button.callback('Привязать пользователя', 'edituser')],
  { columns: 1 },
);
