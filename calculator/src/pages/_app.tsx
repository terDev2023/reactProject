import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app';
import { LoginFormContextProvider } from '../context/LoginFormContext';
import { AppContextProvider } from '@/context/AppConext';

// await fetch( linkForFetch, {
//   method: 'POST',
//   body: fullData,
//   mode: 'no-cors'
// })




export default function MyApp({ Component, pageProps }: AppProps) {

  const url = 'http://localhost:8000/users'

  async function some(ur: string) {
    const response = await fetch(ur, {
      method: 'GET',
      mode: 'no-cors'
    })
    const newResponce = response.arrayBuffer;
    console.log(String(newResponce))
    return String(newResponce)
  }
  

  const users = String(some(url))
  return (
    <AppContextProvider>
      <LoginFormContextProvider>
        <Component {...pageProps} />
        <div>
          {users}
        </div>
      </LoginFormContextProvider>
    </AppContextProvider>
  );
}
