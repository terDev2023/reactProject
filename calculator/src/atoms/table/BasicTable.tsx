import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { COLUMNES } from './columns';
import sendHttpRequest from '@/utils/sendHTTPRequest';
import { Column } from 'react-table';
import { Input } from '@/atoms/Inputs/baseInput';
import { ModalActivator } from '../ModalActivator';
import styles from './BasicTable.module.css';
import { NewModalWindow } from '@/components/NewModalWindow/NewModalWindow';
import { Button } from '../Button';

const urlforGet = (amountOfUsers: number, actualIndex: number = 0) => {
  return `http://localhost:8000/users?amountOfRows=${amountOfUsers}&index=${actualIndex}`;
};

export const BasicTable = () => {
  const amountOfusers: number = 5;
  const [users, setUsers] = useState([]);
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

  const columns: Column<never>[] = useMemo(() => COLUMNES as never, []);
  const data = useMemo(() => users, [users]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^\d+$/;
    const value = e.target.value;
    if (reg.test(value) || value === '') setId(value);
  }, []);

  const handlerIdButtonClick = useCallback(() => {
    const met = 'GET';
    sendHttpRequest({ url: `http://localhost:8000/user/${id}`, method: met }).then(res => {
      if (res.result === 'There is no user with this ID') alert('There is no user with this ID');
      else alert(`Имя: ${res.result.name}, возраст: ${res.result.age}`);
    });
  }, [id]);

  const handlerDeleteUserClick = useCallback( async (actualID: number) => {
    const met = 'DELETE';
    const deletedID = (await sendHttpRequest({ url: `http://localhost:8000/user/${actualID}`, method: met })).result
    setUsers( (prev) => {
      const newArr =  prev.filter((n: any) => {
        if (Number(n.id) !== Number(deletedID)) return n
      })
      console.log(newArr)
      return newArr
    })
    // setTotal((prev) => prev - 1)
    
  }, [])

  const handlerUpdateUser = useCallback((args: { id?: number; name: string; age: number }) => {
    const { id, name, age } = args;
    console.log(id, name, age)
    setUsers((prev) => {
      const editedUsers: any = prev.map((user: any) => {
      if (Number(user.id) === Number(id)) {
         return {
          ...user,
          name: name,
          age: age,
         }
        }
        return user
      });
      return editedUsers;
    });
  }, []);

  return (
    <div className={styles.allTable}>
      <Input type='text' placeholder='Finde user by ID' onChange={handlerChange} value={id} />
      <ModalActivator onClick={handlerIdButtonClick} className={styles.idButton} buttonText='Find user' />
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
                  isEdit
                  userId={Number((row.values as any).id as string)}
                  userName={(row.values as any).name}
                  userAge={(row.values as any).age}
                  onEditSubmit={handlerUpdateUser}
                />
                <Button onClick={() => handlerDeleteUserClick(Number((row.values as any).id as string))} />
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pages.map((_, index) => {
        return (
          <button key={index + 1} onClick={() => handlerClickPage(index)}>
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
