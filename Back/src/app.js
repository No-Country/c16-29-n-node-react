import {APP_PORT} from "../d_config.js"
import express from "express"
import cors from 'cors'

require("dotenv").config();
const methodOverride = require('method-override');

//import db from './database/db.js'



import persRouter from './routes/PersRoutes.js'

const  [ markRouter, subjectsRouter ] = require("./routes");


const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));//captura eventos de formulario
app.use(express.json())
app.use(methodOverride('_method'));//habilitar metodos put y delete wn los form (?_method=PUT)(?_method=DELETE)
app.use('/pers', persRouter)
app.use('/login', persRouter)
app.use(`/api/marks`, markRouter);
app.use(`/api/subjects`, subjectsRouter);
/*try {
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log('Error de conexion a la DB =', error)
}*/
// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(APP_PORT, ()=>{
    console.log(`Server UP run in https://localhost:${APP_PORT}/`)
})