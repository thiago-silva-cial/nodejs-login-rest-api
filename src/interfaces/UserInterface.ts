import { Document } from 'mongoose'

interface TelefoneInterface {
    numero: string,
    ddd: string
}

export default interface UserInterface extends Document {
    nome: string,
    email: string,
    senha: string,
    telefones: TelefoneInterface[]
    dataCriacao: Date,
    dataAtualizacao: Date,
    ultimoLogin: Date,
    token: string,
    generateToken(),
    compareHash()
}
