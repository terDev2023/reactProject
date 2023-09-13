import React, { createContext, useContext, ReactElement, useState, useCallback, Dispatch, SetStateAction } from 'react';

interface IProps {
  children: ReactElement | ReactElement[];
}

interface IContext {
  handlerChangeLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginValue: string;
  setLoginValue:  Dispatch<SetStateAction<string>>
}

const LoginFormContext = createContext({} as IContext);

export const useLoginFormContext = () => useContext(LoginFormContext);

export const LoginFormContextProvider = (props: IProps) => {
  const { children } = props;

  const [loginValue, setLoginValue] = useState('');

  const handlerChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue(e.target.value);
  }, []);

  return (
   <LoginFormContext.Provider value={{
    handlerChangeLogin,
    loginValue,
    setLoginValue,
   }}>
      {children}
   </LoginFormContext.Provider>
  )
}
