import User from './models/User';
import Role from './models/Role';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secretKey } from './config';

const generateAccessToken = (id: string, roles: string[]) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secretKey.secret, { expiresIn: '24h' });
};

interface IUser {
  username: string;
  password: string;
  roles: string[];
  _id: string;
}

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регестрации' });
      }
      const { username, password } = req.body as any;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({ username, password: hashPassword, roles: [userRole?.value] });
      await user.save();
      res.status(200).json({ message: 'Пользователь зарегестрирован' });
    } catch (e) {
      console.log(e);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body as never;
      const user: IUser | null = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Юзер не найден' });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
        const users = await User.find()
        res.json({users})
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
