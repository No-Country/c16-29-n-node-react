import { PORT } from "./d_config.js";
import  express  from "express";
import  cors  from "cors";

import db from './database/db.js'

import nonAttendancesRouter from './routes/NonAttendancesRoutes.js'
import bannsRouter from './routes/BannsRoutes.js'
import notesRouter from './routes/NotesRoutes.js'
import LoginRouter  from "./routes/LoginRoutes.js"
import UsersRouter  from "./routes/UsersRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/nonattendances", nonAttendancesRouter);
app.use("/api/banns", bannsRouter);
app.use("/api/notes", notesRouter);
app.use("/api/login", LoginRouter);
app.use("/api/user", UsersRouter);

try {
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log('Error de conexion a la DB =', error)
}

app.listen(PORT, () => {
  console.log(`Server UP run in https://localhost:${PORT}/`);
});
