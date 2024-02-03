import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
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
app.get('/', (req, res)=>{
    res.send('555qwe')
})
app.use('/auth', authRoutes)

app.listen(PORT, ()=>console.log(`Server runing on port ${PORT}`))