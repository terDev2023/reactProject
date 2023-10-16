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
  _id?: string;
  name: string;
  age: number;
}

interface IUsersGetArgs {
  amountOfusers: number;
  quantityOfUsersBeforeThisPage: number;
  met: Method;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const BasicTable = () => {
  const amountOfusers: number = 5;
  const [users, setUsers] = useState<IUserArgs[]>([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [_id, set_Id] = useState('');
  const [quantityOfUsersBeforeThisPage, setQuantityOfUsersBeforeThisPage] = useState(index * amountOfusers);

  const handlerClickPage = useCallback((indexOfPage: number) => {
    setIndex(indexOfPage);
    setQuantityOfUsersBeforeThisPage(indexOfPage * amountOfusers);
  }, []);

  const getUsers = useCallback((args: IUsersGetArgs) => {
    const {amountOfusers, quantityOfUsersBeforeThisPage, met} = args
    sendHttpRequest({ url: urlforGet(amountOfusers, quantityOfUsersBeforeThisPage), method: met }).then(res => {
      if (!res.result.err) {
        setUsers(res.result.finalRows);
        setTotal(res.result.total);
      }
    });
  }, []);

  useEffect(() => {
    // console.log('количесто userов до :', quantityOfUsersBeforeThisPage)
    const met = 'GET';

    getUsers({amountOfusers: amountOfusers, quantityOfUsersBeforeThisPage: quantityOfUsersBeforeThisPage, met: met})
  }, []);

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
    if (reg.test(value) || value === '') set_Id(value);
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
    sendHttpRequest({ url: `http://localhost:8000/user/${_id}`, method: met }).then(res => {
      if (res.result === 'There is no user with this ID') alert('There is no user with this ID');
      else alert(`Имя: ${res.result.name}, возраст: ${res.result.age}`);
    });
  }, [_id]);

  const handlerUpdateUser = useCallback((args: { _id?: string; name: string; age: number }) => {
    const { _id, name, age } = args;
    setUsers(prev => {
      const editedUsers: any = prev.map((user: any) => {
        if (user._id === _id) {
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

  const handlerModalWindowSubmitForPost = useCallback(
    async (args: IUserArgs) => {
      const { name, age } = args;

      console.log(name, age)

      const body = {
        name: name,
        age: Number(age),
      };
      console.log(body)
      const res = await sendHttpRequest({
        url: `http://localhost:8000/user`,
        method: 'POST',
        data: body,
        contentType: 'application/json',
      });

      // if (res.status === 400) alert(res.result.message)

      if (res.status === 200) {
        if (users.length < amountOfusers) {
          setUsers(prev => {
            const newArr = [...prev];
            newArr.push({ _id: res.result._id, name: name, age: age });
            return newArr;
          });
        } else {
          setQuantityOfUsersBeforeThisPage(Math.round(total / amountOfusers) * amountOfusers);
          setIndex(Math.round(total / amountOfusers));
        }
      }
    },
    [users]
  );

  const handlerModalWindowSubmitForPut = useCallback(async (args: IUserArgs) => {
    const { name, age, _id } = args;
    // console.log(args);
    const body = {
      _id: _id,
      name: name,
      age: Number(age),
    };
    const res = await sendHttpRequest({
      url: `http://localhost:8000/user/${body._id}`,
      method: 'PUT',
      data: body,
      contentType: 'application/json',
    });
    if (res.result !== 'There is no edited user') handlerUpdateUser({ _id: String(_id), name: name, age: Number(age) });
  }, []);

  const handlerDeleteUserClick = useCallback(
    async (actualID: string) => {
      const met = 'DELETE';

      const response = await sendHttpRequest({
        url: `http://localhost:8000/user/${actualID}`,
        method: met,
        contentType: 'application/json',
      });

      setTotal(response.result.total);

      if (response.status === 200) {
        if (users.length === 1) {
          setUsers(() => {
            const newArr: IUserArgs[] = [];
            return newArr;
          });
          setQuantityOfUsersBeforeThisPage(
            prev => (prev = Math.round((total - amountOfusers) / amountOfusers) * amountOfusers)
          );
          setIndex(prev => (prev = Math.round(total / 5)));
        } else {
          setUsers(prev => {
            const newUsers: IUserArgs[] = [];
            prev.map(user => {
              if (String(user._id) !== actualID) newUsers.push(user);
            });
            return newUsers;
          });
        }
      }
    },
    [users]
  );

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
      <Input type='text' placeholder='Finde user by ID' onChange={handlerChange} value={_id} />
      <Button onClick={handlerIdButtonClick} text='Find user' />
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
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
                        _id: String((row.values as any)._id) as string,
                        name: firstRow,
                        age: Number(secondRow),
                      });
                    }}
                    onSubmitFirstRowChek={handlerSubmitFirstRowChek}
                    onSubmitSecondRowChek={handlerSubmitSecondRowChek}
                  />
                  <Button
                    onClick={() => handlerDeleteUserClick(String((row.values as any)._id) as string)}
                    text='Delete user'
                  />
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pages.map((user, ind) => {
        return (
          <button
            key={ind + 1}
            onClick={() => handlerClickPage(ind)}
            className={ind === index ? `${styles.button} ${styles.active}` : `${styles.button}`}
          >
            {ind + 1}
          </button>
        );
      })}
    </div>
  );
};
