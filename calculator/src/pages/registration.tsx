import { NewModalWindow } from '@/components/NewModalWindow/NewModalWindow';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import sendHttpRequest from '@/utils/sendHTTPRequest';

const Registration = () => {

    const handlerCheck = (e: string) => {
        console.log(e !== '')
        if (e !== '') return true
        else return false
    }
  const handlerSubmit = async (args: { login: string; password: string }) => {
    const {login, password }= args
    const data = {
        login: login,
        password: password
    }
    const responce = await sendHttpRequest({ url: `http://localhost:3000/auth/registration`, method: 'POST', data: data});
    console.log(responce.result)
  };
  return (
    <>
      <NewModalWindow
        buttonText='Sign up'
        onSubmit={({ firstRow, secondRow }) => handlerSubmit({ login: firstRow, password: secondRow })}
        firstRowPlaceholder='Login'
        secondRowPlaceholder='Password'
        onSubmitFirstRowChek={handlerCheck}
        onSubmitSecondRowChek={handlerCheck}
      />
    </>
  );
};

export default Registration;
