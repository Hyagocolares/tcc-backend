// src/app.ts
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { errorHandler } from './middlewares/error.middleware'

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import courseRoutes from './routes/courseRoutes'
import requestRoutes from './routes/requestRoutes'
import consentRoutes from './routes/consentRoutes'
import disciplineRoutes from './routes/disciplineRoutes'
import statusRequestRoutes from './routes/statusRequestRoutes'
import passwordRoutes from './routes/passwordRoutes';
import teacherConsentDisciplineRoutes from './routes/teacherConsentDisciplineRoutes'

dotenv.config()
const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // ou '*'
    credentials: true
}))

app.use(express.json())

app.use('/v1/auths', authRoutes)
app.use('/v1/courses', courseRoutes)
app.use('/v1/disciplines', disciplineRoutes)
app.use('/v1/users', userRoutes)
app.use('/v1/reset', passwordRoutes)
app.use('/v1/consents', consentRoutes)
app.use('/v1/requests', requestRoutes)
app.use('/v1/statusRequests', statusRequestRoutes)
app.use('/v1/teacherConsentDisciplines', teacherConsentDisciplineRoutes)

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'service is running'
    })
})

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'UFRA API v1.0.0'
    })
})

app.use(errorHandler)

export default app