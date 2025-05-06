import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const port: number = 3000;

app.use(express.json());

const mongoUri = process.env.MONGO_URI

app.get('/', (req, res) => {
    res.send('User API is live!');
})

app.get('/user/:id', (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0') next('route')
    // otherwise pass the control to the next middleware function in this stack
    else next()
  }, (req, res, next) => {
    // send a regular response
    res.send('regular')
  })
  
  // handler for the /user/:id path, which sends a special response
  app.get('/user/:id', (req, res, next) => {
    res.send('special')
  })

app.post('/register', (req: Request, res: Response) => {

})

app.post('/login', (req: Request, res: Response) => {

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})