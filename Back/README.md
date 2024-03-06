Esta capa cuenta con las siguientes extensiones:

dotenv  => para poder trabajar con variables de entorno, estas se definen en el archivo d_config.js
express => para generar el servisio  RESTFul y manejar la ruta del servidor
jsonwebtoken => para autenticacion de usuarios, genera un token por medio de una Key privada.
nodemon => En ambiente de desarrollo permite negerar un reinicio del servidor cada vez que se guarda un cambio en algun archivo.
sequelize  => Es el ORM para trabajar la conexion con la DB.
bcryptjs   => Se utiliza para encriptar las contraseñas antes de guardar

Rutas:

POST /api/banns [TEACHER]
PUT /api/banns/:id [TEACHER]
GET /api/banns/current [TUTOR, STUDENT, TEACHER]
DELETE /api/banns/:id [TEACHER]

POST /api/exams [TEACHER]
POST /api/exams/marks [TEACHER]
PUT /api/marks/:id [TEACHER]
GET /api/exams/current [TEACHER]
GET /api/exams/:id/marks [TEACHER]
GET /api/marks/current [TUTOR, STUDENT]

POST /api/notes [TEACHER]
PUT /api/notes/:id [TEACHER]
GET /api/notes/current [TUTOR, TEACHER]
DELETE /api/notes/:id [TEACHER]
