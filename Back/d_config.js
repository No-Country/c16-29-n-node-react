import {config} from 'dotenv'

config()

export const APP_PORT =  process.env.PORT || 4321
export const DB_USER =  process.env.DB_USER || 'meicapp'
export const DB_PASSWORD =  process.env.DB_PASSWORD ||'appmeicno023'
export const DB_HOST =  process.env.DB_HOST || '127.0.0.1'
export const DB_DATABASE =  process.env.DB_DATABASE || 'meic'
export const DB_PORT =  process.env.DB_PORT ||3306

//Datos para el token
export const TOKEN_KEY = "NoLoVasAiM4gIn4RnIeNm1L14ñ05"