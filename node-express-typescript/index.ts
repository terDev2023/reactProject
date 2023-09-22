import express, { Express, Request, Response, Application, response, query } from 'express';
import os from 'os';
import fs from 'fs';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 8000;

const text = fs.readFileSync('./users.txt');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

const users = [
  { id: 0, name: 'Aleksey', age: 25 },
  { id: 1, name: 'John', age: 14 },
  { id: 2, name: 'John1', age: 141 },
  { id: 3, name: 'Nikolay', age: 31 },
  { id: 4, name: 'Ter', age: 23 },
  { id: 5, name: 'Lera', age: 37 },
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
  index?: number;
  arr: any[];
}

const getNumRows = (args: IArgs) => {
  const { amountOfRows = 5, index = 0, arr } = args;
  const end = index + amountOfRows;
  return arr.slice(index, end);
};



app.get('/users', (req: Request, res: Response) => {
  const amountOfRows = req.query.amountOfRows as string;
  let index = req.query.index as string;

  const finalRows = getNumRows({ amountOfRows: Number(amountOfRows), index: Number(index), arr: users });

  res
    .json({
      finalRows: finalRows,
      total: users.length,
    })
    .status(200);
});

app.get('/user/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const user = users.find( (user) => {
    if (user.id === Number(id)) {
      return true
    }
    else {
      return false
    }
  });
  if (!user) res.json('There is no user with this ID')
  else res.json(user)
});

app.post('/user', (req: Request, res: Response) => {
  console.log('Пришло')
  const body = req.body
  console.log(body);
  body.id = users.length
  users.push(body)
  res.send('Success')
})

app.put('/user/:id', (req: Request, res: Response) => {
  console.log(req.body)
  const userId = req.params.id as string
  const editedUser = users.find( (user) => {
    if (Number(userId) === user.id) {
      return true
    }
    else {
      return false
    }  
  })
    const editedUserBody = req.body
    if (editedUser) {
      editedUser.name = editedUserBody.name
      editedUser.age = editedUserBody.age
    }
    if (!editedUserBody) res.json('There is no edited user')
    else res.json(editedUserBody)
})

app.delete('/user/:id', (req: Request, res: Response) => {
  console.log(req.body)
  const userId = req.params.id as string
  const deletedUserIndex = users.findIndex((user) => {
    if (Number(userId) === Number(user.id)) {
      return true
    }
    else return false
  })

  if (deletedUserIndex !== -1) {
    users.splice(deletedUserIndex, 1)
    res.json(userId)
  }
  else res.json('There is no deleted user')
    
  });