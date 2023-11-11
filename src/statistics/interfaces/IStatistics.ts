import { TStatus } from '../types/TStatus';
import { ITest } from '../../test/interfaces/ITest';
import { IUser } from '../../user/interfaces/IUser';

export interface IStatistics {
  id: number;
  step: number;
  statistics: any;
  status: TStatus;
  owner: IUser;
  test: ITest;
}
