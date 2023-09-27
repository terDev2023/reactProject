import express, { Express, Request, Response, Application, response, query } from 'express';
import os from 'os';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './Routs/authRouts';

const app: Application = express();
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://terntysemenov:Quality-2023@test-project.3cwpmcj.mongodb.net/`);
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

const text = fs.readFileSync('./users.txt');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', router);

const users = [
  { id: 'qd73obleez', name: 'Aleksey', age: 25 },
  { id: 'vj5zml571r', name: 'John', age: 14 },
  { id: '3qamm148lqa', name: 'John1', age: 141 },
  { id: 'wn3nkiy8ne', name: 'Nikolay', age: 31 },
  { id: 'kcpctg913s', name: 'Ter', age: 23 },
  { id: 'jd1n51indr9', name: 'Lera', age: 37 },

];

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/status', (req: Request, res: Response) => {
  const start = new Date();
  const statusHours = start.getHours() < 10 ? `0${start.getHours}` : start.getHours();
  const statusMin = start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes();
  const statusSec = start.getSeconds() < 10 ? `0${start.getSeconds}` : start.getSeconds();
  const statusStr = `Start: ${statusHours}:${statusMin}:${statusSec}, OS: ${os.platform()}, ${os.release()}, ${text}`;
  res.send(statusStr);
});

interface IArgs {
  amountOfRows?: number;
  id?: string;
  ind?: number;
  arr: any[];
}

const getNumRows = (args: IArgs) => {
  const { amountOfRows = 5, id, ind, arr } = args;
  let index;
  let end;

  if (id) {
    console.log('есть id: ', id)
    let index = arr.findIndex(e => {
      if (String(e.id) === String(id)) return true;
      else return false;
    });
    const numOfIndexOnPage = index % amountOfRows

    index = index - numOfIndexOnPage
    end = index + amountOfRows
    return arr.slice(index, end);
  }
  else if (!id && ind){
    console.log('Есть индекс')
    index = ind
    end = index + amountOfRows 
    return arr.slice(index, end);
  } 
  else {
    console.log('сюда зашло')
    index = 0
    end = index + amountOfRows
    return arr.slice(index, end);
  }
};

app.get('/users', (req: Request, res: Response) => {
  const amountOfRows = req.query.amountOfRows as string;
  let index = req.query.index as string;

  const finalRows = getNumRows({ amountOfRows: Number(amountOfRows), ind: Number(index), arr: users });

  res
    .json({
      finalRows: finalRows,
      total: users.length,
    })
    .status(200);
});

app.get('/user/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const user = users.find(user => {
    if (user.id === id) {
      return true;
    } else {
      return false;
    }
  });
  if (!user) res.json('There is no user with this ID');
  else res.json(user);
});

app.post('/user', (req: Request, res: Response) => {

  const body = req.body;
  const newId = Math.random().toString(36).substring(2)

  const newBody = {
    id: newId,
    name: body.name,
    age: Number(body.age),
  };

  users.push(newBody);


  const amountOfRows = body.amountOfusers as string;
  let index = body.actualIndex as string;


  const finalRows = getNumRows({ amountOfRows: Number(amountOfRows), ind: Number(index), arr: users });

  const data = {
    finalRows: finalRows,
    total: users.length,
  };
  console.log(data.finalRows);
  res.json(data).status(200);
});

app.put('/user/:id', (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const editedUser = users.find(user => {
    if (userId === user.id) {
      return true;
    } else {
      return false;
    }
  });
  const editedUserBody = req.body;
  if (editedUser) {
    editedUser.name = editedUserBody.name;
    editedUser.age = editedUserBody.age;
  }
  if (!editedUserBody) res.json('There is no edited user');
  else res.json(editedUserBody);
});

app.delete('/user/:id', (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const amountOfRows = req.body.amountOfusers as string;

  const deletedUserIndex = users.findIndex(user => {
    if (userId === user.id) {
      return true;
    } else return false;
  });

  if (deletedUserIndex !== -1) {
    users.splice(deletedUserIndex, 1);
  } else res.json('There is no deleted user');

  const actualID = deletedUserIndex !== 0 ? users[deletedUserIndex - 1].id : users[deletedUserIndex].id

  let finalRows

  if (users.length === 0) finalRows = []

  else finalRows = getNumRows({ amountOfRows: Number(amountOfRows), id: actualID, arr: users });


  const data = {
    finalRows: finalRows,
    total: users.length,
  };
  res.json(data).status(200);
});

start();
