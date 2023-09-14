import express, { Express, Request, Response , Application, response } from 'express';
import os from 'os'
import fs from 'fs'
import cors from 'cors'

const app: Application = express();
const port = process.env.PORT || 8000;

const text = fs.readFileSync('./users.txt')


app.use(cors())
 
// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })
 
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })



app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/status', (req: Request, res: Response) => {
    const start = new Date()
    const statusHours = start.getHours() < 10 ? `0${start.getHours}` : start.getHours()
    const statusMin = start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes();
    const statusSec = start.getSeconds() < 10 ? `0${start.getSeconds}` : start.getSeconds()
    const statusStr = `Start: ${statusHours}:${statusMin}:${statusSec}, OS: ${os.platform()}, ${os.release()}, ${text}`
    res.send(statusStr);
});


app.get('/users', (req: Request, res: Response) => {
    const users = [{id: 1, name: 'John', age: 14}, {id: 2, name: 'John1', age: 141}];
    // const usersJSON = JSON.stringify(users)
    // console.log(typeof usersJSON)
    res.json(users).status(200);
})


// app.listen(port, (error) => {
//     error ? console.log('error') : console.log(`listen port: ${port}`)
// })
  