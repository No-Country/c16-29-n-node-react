import {config} from 'dotenv'

config()

export const PORT =  process.env.PORT || 5002
export const DB_USER =  process.env.DB_USER || 'uexulbl2ovselszb'
export const DB_PASSWORD =  process.env.DB_PASSWORD ||'jcgobzIW3KkKaaDxGYYO'
export const DB_HOST =  process.env.DB_HOST || 'btucvoqrbbkszrtziiis-mysql.services.clever-cloud.com'
export const DB_DATABASE =  process.env.DB_DATABASE || 'btucvoqrbbkszrtziiis'
export const DB_PORT =  process.env.DB_PORT ||3306

//Datos para el token
export const TOKEN_KEY = "NoLoVasAiM4gIn4RnIeNm1L14ñ05"