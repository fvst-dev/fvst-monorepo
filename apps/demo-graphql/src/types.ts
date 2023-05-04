import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user?: User;
}
export interface User extends Request {
  userId: string;
}
