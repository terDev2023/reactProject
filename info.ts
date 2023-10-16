
// next js setup link https://nextjs.org/docs/pages/building-your-application/configuring/typescript

// comand to install npx create-next-app@latest

// npm run dev -> start like develop mode
// npm run build -> build app static files 
// npm run start (after npm run build) -> start app like prouction mode

// .ts / tsx

enum UserStatuses {
  Active = 'active',
  Pending = 'pending',
}

type MyNumber = number;
type MyString = string;
type MyBool = boolean;
type MyArrayNumbers = number[];

interface MyObj {
    str: string;
}

interface IMyInterface {
   num: MyNumber;
   arrayNumber: MyArrayNumbers;
   string?: string;
   obj?: MyObj
   status: UserStatuses,
}

type MyPartitialObject = Partial<IMyInterface>;

let num: MyNumber;

const func = (props: IMyInterface) => {
  const { num, arrayNumber, string, obj, status } = props;

  if (status === UserStatuses.Active) {}

  return num;
}


/**
Страницу логина
Проверить\доделать логин енпоинт
Написать енпоит на /me
Написать миделвару аутификации (Она написана надо ее проверить)
 * 
 * 
 */



