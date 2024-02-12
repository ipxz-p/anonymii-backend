import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import {swaggerSpec} from './config/swaggerConfig.js'
import swaggerUi from 'swagger-ui-express';
import chatRoutes from './routes/chat.js'
import messageRoutes from './routes/messages.js'
import notificationRoutes from './routes/notification.js'
import userRoutes from './routes/user.js'

dotenv.config()

const PORT = process.env.PORT || 3500
const app = express()
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use('/auth', authRoutes)
app.use('/chat', chatRoutes)
app.use('/message', messageRoutes)
app.use('/notification', notificationRoutes)
app.use('/user', userRoutes)
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, ()=>console.log(`Server runing on port ${PORT}`))