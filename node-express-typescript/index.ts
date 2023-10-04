import express, { Express, Request, Response, Application, response, query } from 'express';
import os from 'os';
import fs from 'fs';
import cors from 'cors';
import conectToMongoose from './config/mongoose';
import router from './Routs/authRouts';
import getUsers from './services/users/getUsers';
import createUser from './services/users/createUsers';
import getUserById from './services/users/getUserById';
import updateUser from './services/users/updateUser';
import deleteUser from './services/users/deleteUser';

const app: Application = express();
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await conectToMongoose()
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

app.get('/users', async (req: Request, res: Response) => {
  const amountOfRows = req.query.amountOfRows as string;
  let index = req.query.index as string;

  const finalRows = await getUsers({amountOfRows: Number(amountOfRows), numberOfStartScip: Number(index)})

  // console.log(finalRows.users)

  res
    .json({
      finalRows: finalRows.users,
      total: finalRows.total
    })
    .status(200);
});

app.get('/user/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try{
    const user = await getUserById(id)
    res.json(user);
  } catch ( err ) {
    res.json('There is no user with this ID')
  }
});

app.post('/user', async(req: Request, res: Response) => {

  const body = req.body;

  const id = await createUser(body)

  res.json(id).status(200);
});

app.put('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  
  const editedUserBody = req.body;

  const body = {
    _id: userId,
    name: editedUserBody.name,
    age: editedUserBody.age
  }
  try {
    await updateUser(body)
    res.json('success')
  } catch (err) {
    res.json('There is no edited user');
  }
});

app.delete('/user/:id', async (req: Request, res: Response) => {

  const userId = req.params.id as string;
  try {
    const total = await deleteUser(userId);
    res.json(total).status(200);
  } catch (err) {
    res.json('There is no deleted user');
  }
});

start();