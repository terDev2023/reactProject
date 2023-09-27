import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { COLUMNES } from './columns';
import sendHttpRequest from '@/utils/sendHTTPRequest';
import { Input } from '@/atoms/Inputs/baseInput';
import styles from './BasicTable.module.css';
import { NewModalWindow } from '@/components/NewModalWindow/NewModalWindow';
import { Button } from '../Button';

const urlforGet = (amountOfUsers: number, actualIndex: number = 0) => {
  return `http://localhost:8000/users?amountOfRows=${amountOfUsers}&index=${actualIndex}`;
};

interface IUserArgs {
  id?: string;
  name: string;
  age: number;
}

export const BasicTable = () => {
  const amountOfusers: number = 5;
  const [users, setUsers] = useState<{ id: number; name: string; age: string }[]>([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [id, setId] = useState('');

  const handlerClickPage = useCallback((index: number) => {
    setIndex(index * amountOfusers);
  }, []);

  useEffect(() => {
    const met = 'GET';
    sendHttpRequest({ url: urlforGet(amountOfusers, index), method: met }).then(res => {
      setUsers(res.result.finalRows);
      setTotal(res.result.total);
    });
  }, [index]);

  const amountOfPages = total % 5 === 0 ? total / 5 : Math.floor(total / 5) + 1;
  const pages = [...new Array(amountOfPages)].map((_, index) => index + 1);

  const columns = useMemo(() => COLUMNES as any, []);
  const data = useMemo(() => users, [users]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^\w+$/;
    const value = e.target.value;
    if (reg.test(value) || value === '') setId(value);
  }, []);

  const handlerSubmitFirstRowChek = (e: string) => {
    if (e !== '') {
      return true;
    } else return false;
  };

  const handlerSubmitSecondRowChek = (e: string) => {
    if (Number(e) > 0) {
      return true;
    } else return false;
  };

  const handlerIdButtonClick = useCallback(() => {
    const met = 'GET';
    sendHttpRequest({ url: `http://localhost:8000/user/${id}`, method: met }).then(res => {
      if (res.result === 'There is no user with this ID') alert('There is no user with this ID');
      else alert(`Имя: ${res.result.name}, возраст: ${res.result.age}`);
    });
  }, [id]);

  const handlerUpdateUser = useCallback((args: { id?: string; name: string; age: number }) => {
    const { id, name, age } = args;
    setUsers(prev => {
      const editedUsers: any = prev.map((user: any) => {
        if (user.id === id) {
          return {
            ...user,
            name: name,
            age: age,
          };
        }
        return user;
      });
      return editedUsers;
    });
  }, []);

  const handlerModalWindowSubmitForPost = async (args: IUserArgs) => {
    const { name, age } = args;

    const body = {
      name: name,
      age: Number(age),
      amountOfusers: amountOfusers,
      actualIndex: index,
    };
    const res = await sendHttpRequest({
      url: `http://localhost:8000/user`,
      method: 'POST',
      data: body,
      contentType: 'application/json',
    });

    if (res.status === 200) {
      setUsers(res.result.finalRows);
      setTotal(res.result.total);
    }
  };

  const handlerModalWindowSubmitForPut = async (args: IUserArgs) => {
    const { name, age, id } = args;
    console.log(args);
    const body: IUserArgs = { name: name, age: Number(age) };
    if (typeof id === 'string') {
      const idOfeditUser = id;
      body.id = idOfeditUser;
    }
    const res = await sendHttpRequest({
      url: `http://localhost:8000/user/${body.id}`,
      method: 'PUT',
      data: body,
      contentType: 'application/json',
    });
    if (res.result !== 'There is no edited user') handlerUpdateUser({ id: String(id), name: name, age: Number(age) });
  };

  const handlerDeleteUserClick = useCallback(async (actualID: string) => {
    const met = 'DELETE';
    const ind = actualID;
    const data = {
      amountOfusers: amountOfusers,
      actualId: ind,
    };
    const response = (
      await sendHttpRequest({
        url: `http://localhost:8000/user/${actualID}`,
        method: met,
        data: data,
        contentType: 'application/json',
      })
    ).result;

    setUsers(response.finalRows);
    setTotal(response.total);
  }, []);

  return (
    <div className={styles.allTable}>
      <NewModalWindow
        buttonText='Set user'
        onSubmit={({ firstRow, secondRow }) =>
          handlerModalWindowSubmitForPost({
            name: firstRow,
            age: Number(secondRow),
          })
        }
        onSubmitFirstRowChek={handlerSubmitFirstRowChek}
        onSubmitSecondRowChek={handlerSubmitSecondRowChek}
      />
      <Input type='text' placeholder='Finde user by ID' onChange={handlerChange} value={id} />
      <Button onClick={handlerIdButtonClick} text='Find user' />
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className={styles.th}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={styles.th}>
                  {' '}
                  {column.render('Header')}{' '}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={styles.tr}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className={styles.td}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                <div className={styles.buttons}>
                  <NewModalWindow
                    buttonText='Edit user'
                    firstRowText={(row.values as any).name}
                    secondRowText={(row.values as any).age}
                    onSubmit={({ firstRow, secondRow }) => {
                      handlerModalWindowSubmitForPut({
                        id: String((row.values as any).id) as string,
                        name: firstRow,
                        age: Number(secondRow),
                      });
                    }}
                    onSubmitFirstRowChek={handlerSubmitFirstRowChek}
                    onSubmitSecondRowChek={handlerSubmitSecondRowChek}
                  />
                  <Button
                    onClick={() => handlerDeleteUserClick(String((row.values as any).id) as string)}
                    text='Delete user'
                  />
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pages.map((user, index) => {
        return (
          <button key={index + 1} onClick={() => handlerClickPage(index)}>
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
