import {APP_PORT} from "../d_config.js"
import express from "express"
import cors from 'cors'

//import db from './database/db.js'

import persRouter from './routes/PersRoutes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use('/pers', persRouter)
app.use('/login', persRouter)

/*try {
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log('Error de conexion a la DB =', error)
}*/

app.listen(APP_PORT, ()=>{
    console.log(`Server UP run in https://localhost:${APP_PORT}/`)
})