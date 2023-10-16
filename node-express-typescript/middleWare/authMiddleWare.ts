import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';
import { NextFunction } from 'express';
import { IRequest, IDecodedUser } from '../const/types';
import { TokenNames } from '../const/token';

const authMiddleWare = (req: IRequest, res: Response, next: NextFunction) => {
  // const {res, req, next} = args
  try {
    const token = req?.signedCookies[TokenNames.Access]
    // req?.signedCookies
    console.log(token)
    if (!token) {
      return res.status(400).json({ message: 'Нет токена, Пользователь не авторизован' });
    }
    const decodedData = jwt.verify(token, secretKey.secret) as IDecodedUser;
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Другая ошибка, Пользователь не авторизован' });
  }
};

export default authMiddleWare;
