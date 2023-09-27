import { Router } from "express";
import authController from "../authController";
import {check} from 'express-validator'
import authMiddleWare from "../middleWare/roleMiddleWare";
import roleMiddleWare from "../middleWare/roleMiddleWare";

const router = Router();

router.post('/registration', [
    check('username', 'Имя пользователя должно быть непустым').notEmpty(),
    check('password', 'Пароль пользователя должен быть длиннее 4 символов').isLength({min: 4})
],authController.registration)

router.post('/login', authController.login)
router.get('/users', roleMiddleWare(['USER']), authController.getUsers)

export default router