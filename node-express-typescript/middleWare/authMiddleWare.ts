import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

interface IDecodedUser {
  id: number,
  roles: string[]
}

interface IRequest extends Request {
  user: IDecodedUser;
}

const authMiddleWare = (res: Response, req: IRequest, next: () => void) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split('')[1];
    if (!token) {
      return res.status(400).json({ message: 'Пользователь не авторизован' });
    }
    const decodedData = jwt.verify(token, secretKey.secret) as IDecodedUser;
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Пользователь не авторизован' });
  }
};

export default authMiddleWare;
