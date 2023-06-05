import { Request } from 'express';
export interface User extends Request {
  userId: string;
}
