import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useBool from '@/hooks/useBool';
import { Button } from '@/atoms/Button';
import { ModalActivator } from '@/atoms/ModalActivator';
import { Input } from '@/atoms/Inputs/baseInput';
import { ModalButton } from '@/atoms/ModalButton';
import styles from './NewModalWindow.module.css';
import sendHttpRequest from '@/utils/sendHTTPRequest';

interface IUserArgs {
  id?: number;
  name: string;
  age: number;
}

interface IProps {
  buttonText: string;
  isEdit?: boolean;
  userId?: number;
  userName?: string;
  userAge?: string;
  onEditSubmit?: (args: IUserArgs) => void;
}

export const NewModalWindow = (props: IProps) => {
  const { buttonText, isEdit = false, userId = null, userName = '', userAge = '', onEditSubmit } = props;
  const isModalActive = useBool();
  const hasNameAndAge = useBool();

  const [name, setName] = useState(userName);
  const [age, setAge] = useState(userAge);

  const handlerActivatorClick = useCallback(() => {
    setName(userName);
    setAge(userAge);
    isModalActive.onTrue();
  }, [userName, userAge]);

  const handlerSubmit = async () => {
    isModalActive.onFalse();
    const body: IUserArgs = { name: name, age: Number(age) };
    if (isEdit && typeof userId === 'number') {
      const idOfeditUser = userId;
      body.id = idOfeditUser;
    }
    if (!isEdit) {
      await sendHttpRequest({
        url: `http://localhost:8000/user`,
        method: 'POST',
        data: body,
        contentType: 'application/json',
      });
    } else {
      await sendHttpRequest({
        url: `http://localhost:8000/user/${body.id}`,
        method: 'PUT',
        data: body,
        contentType: 'application/json',
      });
      if (onEditSubmit) onEditSubmit({ id: Number(userId), name: name, age: Number(age) });
    }
    setName('');
    setAge('');
  };

  const handlerNameChange = useCallback((element: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = element.target.value;
    setName(nameValue);
  }, []);
  const handlerAgeChange = useCallback((element: React.ChangeEvent<HTMLInputElement>) => {
    const ageValue = element.target.value;
    setAge(ageValue);
  }, []);

  const handlerCrossClick = useCallback(() => {
    isModalActive.onFalse();
  }, []);

  useEffect(() => {
    if (name && Number(age) > 0) hasNameAndAge.onTrue();
    else hasNameAndAge.onFalse();
  }, [name, age]);

  return (
    <div>
      {!isModalActive.state && (
        <ModalActivator
          buttonText={buttonText}
          onClick={handlerActivatorClick}
          className={styles.modalWindowActivator}
        />
      )}
      {isModalActive.state && (
        <div className={styles.modalWindow}>
          <ModalButton className={styles.cross} img='/cross.svg' alt='cross' onClick={handlerCrossClick} />
          <Input type='text' placeholder='Name' onChange={handlerNameChange} value={name} />
          <Input type='text' placeholder='Age' onChange={handlerAgeChange} value={String(age)} />
          <Button text={buttonText} onClick={handlerSubmit} disabled={!hasNameAndAge.state} />
        </div>
      )}
    </div>
  );
};
