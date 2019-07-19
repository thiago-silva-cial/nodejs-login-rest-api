import * as dotenv from 'dotenv'

// Carrega o arquivo de configuração de acordo com o ambiente
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})
