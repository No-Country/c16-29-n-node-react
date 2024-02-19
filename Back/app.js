import { APP_PORT } from "./d_config.js";
import  express  from "express";
import  cors  from "cors";

import db from './database/db.js'

import attendancesRouter from './routes/AttendancesRoutes.js'
import bannsRouter from './routes/BannsRoutes.js'
import notesRouter from './routes/NotesRoutes.js'
import LoginRouter  from "./routes/LoginRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/attendances", attendancesRouter);
app.use("/banns", bannsRouter);
app.use("/notes", notesRouter);
app.use("/login", LoginRouter);

try {
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log('Error de conexion a la DB =', error)
}

app.listen(APP_PORT, () => {
  console.log(`Server UP run in https://localhost:${APP_PORT}/`);
});
