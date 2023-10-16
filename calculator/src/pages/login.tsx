import { NewModalWindow } from '@/components/NewModalWindow/NewModalWindow';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import sendHttpRequest from '@/utils/sendHTTPRequest';
import { USER_LOGIN } from '@/const/ApiUrls';
import { TABLE_URL } from '@/const/clientUrls';

const Login = () => {

  const router = useRouter()

    const handlerCheck = (e: string) => {
        if (e !== '') return true
        else return false
    }
  const handlerSubmit = async (args: { login: string; password: string }) => {
    const {login, password }= args
    const data = {
        username: login,
        password: password
    }
    const responce = await sendHttpRequest({ url: USER_LOGIN, method: 'POST', data: data});
    if (responce.status === 200) {
      router.push(TABLE_URL)
    } 
  };
  return (
    <>
      <NewModalWindow
        buttonText='Log in'
        onSubmit={({ firstRow, secondRow }) => handlerSubmit({ login: firstRow, password: secondRow })}
        firstRowPlaceholder='Login'
        secondRowPlaceholder='Password'
        onSubmitFirstRowChek={handlerCheck}
        onSubmitSecondRowChek={handlerCheck}
      />
    </>
  );
};

export default Login;
