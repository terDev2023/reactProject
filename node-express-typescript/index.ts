import express, { Request, Response, Application, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import cors from 'cors';
import conectToMongoose from './config/mongoose';
import router from './Routs/authRouts';
import getUsers from './services/users/getUsers';
import createUser from './services/users/createUsers';
import getUserById from './services/users/getUserById';
import updateUser from './services/users/updateUser';
import deleteUser from './services/users/deleteUser';
import cookieParser from 'cookie-parser';
import { secretKey } from './config';
import createHttpError from 'http-errors';
import { ServerError, InternalError } from './utils/errors/CommonErrors';
import ApiError from './utils/errors/ApiError';
import authMiddleWare from './middleWare/authMiddleWare';
import { IRequest } from './const/types';

const app: Application = express();
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await conectToMongoose();
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secretKey.secret));
app.use('/auth', router);



app.get('/users', expressAsyncHandler (async (req: Request, res: Response) => {
  const amountOfRows = req.query.amountOfRows as string;
  let index = req.query.index as string;

  // throw new ServerError();
  // throw new Error();

  const finalRows = await getUsers({ amountOfRows: Number(amountOfRows), numberOfStartScip: Number(index) });

  if (!finalRows) throw createHttpError(400, 'There are no users');
  res
    .json({
      finalRows: finalRows.users,
      total: finalRows.total,
    })
    .status(200);
}));

app.get('/user/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await getUserById(id);
  if (!user) throw createHttpError(400, `There is no user with ID '${id}'`);
  res.json(user);
});

app.post('/user', async (req: Request, res: Response) => {
  const body = req.body;

  console.log(body);

  const user = await createUser(body);

  if (!user) throw createHttpError(400, 'Something is bad');

  res.json({ _id: user._id, total: user.total }).status(200);
});

app.get('/me', authMiddleWare, async (req: IRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id
  if (userId) {
   const user = await getUserById(userId);
   res.status(200).json(user);
  }
  else{
    res.status(400).json({message: "User не найден"})
  }

});

app.put('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  const editedUserBody = req.body;

  const body = {
    _id: userId,
    name: editedUserBody.name,
    age: editedUserBody.age,
  };

  const updatedUser = await updateUser(body);
  if (!updatedUser) throw createHttpError(400, 'There is no edited user');
  res.json({ message: 'success' }).status(200);
});

app.delete('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  const deletedUser = await deleteUser(userId);
  if (!deletedUser) throw createHttpError(400, 'There is no deleted user');
  res.json({ total: deletedUser.total }).status(200);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log('Error --->', error)
  // console.log('Error Res --->', res)
  if (error instanceof ApiError) {
    res.status(error.status).json({ err: error });
  } else {
    const internalError = new InternalError()
    res.status(500).json({ err: internalError})
  }
});

start();
