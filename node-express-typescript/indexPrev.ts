// import express, { Express, Request, Response, Application, response, query } from 'express';
// import cors from 'cors';
// import mongoose, { Model, ObjectId, Schema } from 'mongoose';
// import router from './Routs/authRouts';
// import { Int32 } from 'mongodb';

// const app: Application = express();
// const jsonParser = express.json();
// const port = process.env.PORT || 8000;

// interface IUser extends Document {
//   _id: ObjectId,
//   name: String,
//   age: Int32
// }

// const userSchema: Schema = new Schema({
//   name: String,
//   age: Number
// })

// let NewUser: any
// if (mongoose.models.Users){
//   NewUser = mongoose.model<IUser>('Users')
// } else {
//   NewUser = mongoose.model<IUser>('Users', userSchema)
// }


// /////////////////////////////
// // const uri: string = `mongodb+srv://terntysemenov:Quality-2023@cluster0.lte7dgk.mongodb.net/Users`

// // const usersPromise = () => mongoose.connect(uri)
// // .then(() => {
// //   return NewUser.find({})
// // })
// // .then((docs:IUser[]) => {
// //   return docs
// // })
// // .catch((err: Error) => {
// //   console.error(err)
// // })


// app.use(cors());
// app.use(jsonParser);
// app.use(express.urlencoded({ extended: false }));
// app.use('/auth', router);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to Express & TypeScript Server');
// });

// ///////////////////////////

// function createConnect( nameDB:string ){

//   const uri: string = `mongodb+srv://terntysemenov:Quality-2023@cluster0.lte7dgk.mongodb.net/${nameDB}`

//   return mongoose.connect(uri).then(() => {
//     console.log('Connected')
//   })
//     // .then(() => {
//     //   return NewUser.find({})
//     // })
//     // .then((docs:IUser[]) => {
//     //   console.log(docs)
//     //   return docs
//     // })
//     // .catch((err: Error) => {
//     //   console.error(err)
//     // })

// }

// // createConnect('');

// // Начинаем подключение
// // const FirstConnect = createConnect( 'Users' );

// // Promise.all()
// //     .then( ( result ) => {

// //         console.log( 'Твой код' );

// //     } )

// // Начинаем подключение
// //  const SecondConnect = createConnect( 'Products' );






// // const us = getPromise(usersPromise)

// // app.get("/api/users", async (req:Request, res: Response)=>{

//   // res.send(users);

//   // const amountOfRows = req.query.amountOfRows as string;
//   // let index = req.query.index as string;

//   // const finalRows = getNumRows({ amountOfRows: Number(amountOfRows), ind: Number(index), arr: users });
//   // console.log(finalRows)
//   // res
//   //   .json({
//   //     finalRows: finalRows,
//   //     total: users.length,
//   //   })
//   //   .status(200);
// // });

// // interface IArgs {
// //   amountOfRows?: number;
// //   id?: string;
// //   ind?: number;
// //   arr: any[];
// // }

// // const getNumRows = (args: IArgs) => {
// //   const { amountOfRows = 5, id, ind, arr } = args;
// //   let index;
// //   let end;

// //   if (id) {
// //     console.log('есть id: ', id)
// //     let index = arr.findIndex(e => {
// //       if (String(e.id) === String(id)) return true;
// //       else return false;
// //     });
// //     const numOfIndexOnPage = index % amountOfRows

// //     index = index - numOfIndexOnPage
// //     end = index + amountOfRows
// //     return arr.slice(index, end);
// //   }
// //   else if (!id && ind){
// //     console.log('Есть индекс')
// //     index = ind
// //     end = index + amountOfRows 
// //     return arr.slice(index, end);
// //   } 
// //   else {
// //     index = 0
// //     end = index + amountOfRows
// //     return arr.slice(index, end);
// //   }
// // };

// // // app.get('/users', (req: Request, res: Response) => {
// // //   console.log('Дошло')
// // //   const amountOfRows = req.query.amountOfRows as string;
// // //   let index = req.query.index as string;

// // //   const finalRows = getNumRows({ amountOfRows: Number(amountOfRows), ind: Number(index), arr: users });
// // //   console.log(finalRows)
// // //   res
// // //     .json({
// // //       finalRows: finalRows,
// // //       total: users.length,
// // //     })
// // //     .status(200);
// // // });

// // // app.get('/user/:id', (req: Request, res: Response) => {

// // //   const users = await User.find({});

// // //   const id = req.params.id;
// // //   const user = users.find(user => {
// // //     if (user.id === id) {
// // //       return true;
// // //     } else {
// // //       return false;
// // //     }
// // //   });
// // //   if (!user) res.json('There is no user with this ID');
// // //   else res.json(user);
// // // });

// // // app.post('/user', (req: Request, res: Response) => {

// // //   const body = req.body;
// // //   const newId = Math.random().toString(36).substring(2)

// // //   const newBody = {
// // //     id: newId,
// // //     name: body.name,
// // //     age: Number(body.age),
// // //   };

// // //   users.push(newBody);


// // //   const amountOfRows = body.amountOfusers as string;
// // //   let index = body.actualIndex as string;


// // //   const finalRows = getNumRows({ amountOfRows: Number(amountOfRows), ind: Number(index), arr: users });

// // //   const data = {
// // //     finalRows: finalRows,
// // //     total: users.length,
// // //   };
// // //   console.log(data.finalRows);
// // //   res.json(data).status(200);
// // // });

// // // app.put('/user/:id', (req: Request, res: Response) => {
// // //   const userId = req.params.id as string;
// // //   const editedUser = users.find(user => {
// // //     if (userId === user.id) {
// // //       return true;
// // //     } else {
// // //       return false;
// // //     }
// // //   });
// // //   const editedUserBody = req.body;
// // //   if (editedUser) {
// // //     editedUser.name = editedUserBody.name;
// // //     editedUser.age = editedUserBody.age;
// // //   }
// // //   if (!editedUserBody) res.json('There is no edited user');
// // //   else res.json(editedUserBody);
// // // });

// // // app.delete('/user/:id', (req: Request, res: Response) => {
// // //   const userId = req.params.id as string;
// // //   const amountOfRows = req.body.amountOfusers as string;

// // //   const deletedUserIndex = users.findIndex(user => {
// // //     if (userId === user.id) {
// // //       return true;
// // //     } else return false;
// // //   });

// // //   if (deletedUserIndex !== -1) {
// // //     users.splice(deletedUserIndex, 1);
// // //   } else res.json('There is no deleted user');

// // //   const actualID = deletedUserIndex !== 0 ? users[deletedUserIndex - 1].id : users[deletedUserIndex].id

// // //   let finalRows

// // //   if (users.length === 0) finalRows = []

// // //   else finalRows = getNumRows({ amountOfRows: Number(amountOfRows), id: actualID, arr: users });


// // //   const data = {
// // //     finalRows: finalRows,
// // //     total: users.length,
// // //   };
// // //   res.json(data).status(200);
// // // });

// // start();
