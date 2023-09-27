import {Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { secretKey } from '../config';

const roleMiddleWare = (roles: string[]) => {
    return (req: Request, res: Response, next: () => void) => {
    if (req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization?.split('')[1]
        if (!token){
            return res.status(400).json({message: 'Пользователь не авторизован'})
        }
        const {roles: userRoles} = jwt.verify(token, secretKey.secret) as JwtPayload
        let hasRole = false
        userRoles.forEach( (role: string) => {
            if (roles.includes(role)){
                hasRole = true
            }
        });
        if (!hasRole) {
            return res.status(403).json({message: 'У Вас нрет доступа'})
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Пользователь не авторизован'})
    }
}
}



export default roleMiddleWare