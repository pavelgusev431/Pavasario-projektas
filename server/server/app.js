import express from 'express'
import cors from 'cors'
import errorHandler from '../middlewares/errorHandler.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from '../routers/userRouter.js'

dotenv.config()
const CLIENT_HOST = process.env.CLIENT_HOST
const CLIENT_PORT = process.env.CLIENT_PORT

const app = express()
app.use(express.json())
app.use(
    cors({
        origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
        credentials: true,
    })
)
app.use(cookieParser())
//==============
//routes go here
app.use('/users', userRouter)
//==============
//last
app.use(errorHandler)

export default app
