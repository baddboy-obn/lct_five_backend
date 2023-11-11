import { IUser } from '../interfaces/IUser';

export class GetUserDto implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  chatId?: number;
  telegramId?: number;
  email: string;
}
