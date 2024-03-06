import { PORT } from "../d_config.js";
import  express  from "express";
import  cors  from "cors";

import db from './database/db.js'

import nonAttendancesRouter from './routes/NonAttendancesRoutes.js'
import bannsRouter from './routes/BannsRoutes.js'
import notesRouter from './routes/NotesRoutes.js'
import LoginRouter  from "./routes/LoginRoutes.js"
import UsersRouter  from "./routes/UsersRoutes.js"
import markRouter from "./routes/markRoutes.js"
import subjectRouter from "./routes/subjectRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//captura eventos de formulario
app.use("/api/nonattendances", nonAttendancesRouter);
app.use("/api/banns", bannsRouter);
app.use("/api/notes", notesRouter);
app.use("/api/login", LoginRouter);
app.use("/api/users", UsersRouter);
app.use(`/api/marks`, markRouter);
app.use(`/api/subjects`, subjectRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

try {
    await db.authenticate();
    await db.sync();
    await import("./database/seeders/index.js")
    console.log('Conexion exitosa a la DB');
} catch (error) {
    console.log('Error de conexion a la DB =', error);
}

app.listen(PORT, () => {
  console.log(`Server UP run in https://localhost:${PORT}/`);
});
