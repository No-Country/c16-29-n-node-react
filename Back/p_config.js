import {config} from 'dotenv'

config()

export const APP_PORT =  process.env.PORT || 4002
export const DB_USER =  process.env.DB_USER || 'root'
export const DB_PASSWORD =  process.env.DB_PASSWORD ||'RVpYPQoB6LWZfoy9jef2'
export const DB_HOST =  process.env.DB_HOST || 'containers-us-west-18.railway.app'
export const DB_DATABASE =  process.env.DB_DATABASE || 'meic'
export const DB_PORT =  process.env.DB_PORT || 6197


//Datos para el token
export const TOKEN_KEY = "NoLoVasAiM4gIn4RnIeNm1L14ñ05"


