import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { LoginFormContextProvider } from '../context/LoginFormContext';
import { AppContextProvider } from '@/context/AppConext';
import sendHttpRequest from '@/utils/sendHTTPRequest';
import { BasicTable } from '@/atoms/table/BasicTable';
import { NewModalWindow } from '@/components/NewModalWindow/NewModalWindow';

interface IUser {
  id: number,
  name: string,
  age: number
}

export default function MyApp({ Component, pageProps }: AppProps) {
  // const url = 'http://localhost:8000/users';

  // const  [users, setUsers] = useState<IUser[]>([])
  //  useEffect(() => {
  //   const met = 'GET'
  //   const users = sendHttpRequest({url, method: met}).then((res) => {
  //     setUsers(res.result.finalRows)
  //   })
  // }, []);
  return (
    <AppContextProvider>
      <LoginFormContextProvider>
        <Component {...pageProps} />
      </LoginFormContextProvider>
    </AppContextProvider>

  );
}
