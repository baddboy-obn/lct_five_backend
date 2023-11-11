import { IUser } from '../../user/interfaces/IUser';
import {TLinkStatus} from "../types/TLinkStatus";

export interface ILinkUser {
  id: number;
  forUser: IUser;
  hash: string;
  isUsed: TLinkStatus;
  createAt?: Date;
  updateAt?: Date;
}
