import { Request } from "express";

export interface IDecodedUser {
    id: string,
    roles: string[]
  }
  
export interface IRequest extends Request {
    user?: IDecodedUser;
  }