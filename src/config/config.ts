import * as dotenv from 'dotenv'

// Carrega o arquivo de configuração de acordo com o ambiente
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})

// MongoDB connection string
export const mongoConection = process.env.MONGODB_URI
