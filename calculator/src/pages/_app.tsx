import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { LoginFormContextProvider } from '../context/LoginFormContext';
import { AppContextProvider } from '@/context/AppConext';
import sendHttpRequest from '@/utils/sendHTTPRequest';

export default function MyApp({ Component, pageProps }: AppProps) {
  const url = 'http://localhost:8000/users';

  const  [users, setUsers] = useState([])
   useEffect(() => {
    const met = 'GET'
    const users = sendHttpRequest({url, method: met}).then((res) => {
      setUsers(res.result)
    })
  }, []);
  return (
    <AppContextProvider>
      <LoginFormContextProvider>
        <Component {...pageProps} />
        <div>
          {users.map((user) => {
            return <p key={user.id}>{user.name}, {user.age}</p>

          })}
        </div>
      </LoginFormContextProvider>
    </AppContextProvider>
  );
}
