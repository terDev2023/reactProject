import React, { createContext, useContext, ReactElement, useState, useCallback } from 'react';
import { IUser } from '@/const/types';
import sendHttpRequest from '@/utils/sendHTTPRequest';
import { USER_INFO } from '@/const/ApiUrls';

interface IProps {
  children: ReactElement | ReactElement[];
}

interface IContext {
    user: IUser | null
    getUserInformation: () => Promise<boolean>
}

const UserContext = createContext({} as IContext);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props: IProps) => {
    const { children } = props;
    const [user, setUser] = useState<IUser | null>(null)

    const getUserInformation = useCallback(async () => {
        const response = await sendHttpRequest({
            url: USER_INFO,
            method: 'GET'
        })
        if (response.status === 200) {
            setUser(response.result) 
            return true
        } else {
            return false
        }
    }, [])

  
    return (
     <UserContext.Provider value={{
        user: user,
        getUserInformation: getUserInformation
     }}>
        {children}
     </UserContext.Provider>
    )
  }