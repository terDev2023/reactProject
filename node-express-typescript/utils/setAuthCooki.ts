import { Response } from 'express'
import { TokenNames } from '../const/token'
import { addMinutes } from 'date-fns'

 

export const setAuthToken = (res: Response, accessToken: string) => {
    
    res.cookie( TokenNames.Access, accessToken, {
        expires: addMinutes(new Date(), 10),
        httpOnly: true,
        sameSite: true,
        secure: true,
        signed: true,
    })
}