// Interfaces
import UserInterface from '../interfaces/UserInterface'
// Libs
import { Schema } from 'mongoose'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import mongoose = require('mongoose')
import { jwtSecret } from '../config/config'

// Mongoose schema definition
const UserSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  telefones: {
    type: Array,
    required: false
  },
  dataCriacao: {
    type: Date,
    required: true,
    default: Date.now
  },
  dataAtualizacao: {
    type: Date,
    required: true,
    default: Date.now
  },
  ultimoLogin: {
    type: Date,
    required: true,
    default: Date.now
  },
  token: {
    type: String,
    default: ''
  }
})

// Mongoose middlewares
UserSchema.pre('save', function (next): void {
  // Only encrypt the pass when it's modified/new
  if (this.isModified('senha')) {
    let pass = this.get('senha')

    this.set('senha', bcrypt.hashSync(pass, 8))
  }
  next()
})

// Define some methods to the User schema
UserSchema.methods = {
  compareHash(hash): boolean {
    let pass = this.get('senha')

    return bcrypt.compareSync(hash, pass)
  },
  generateToken(): string {
    return jwt.sign({ id: this._id }, jwtSecret, {
      expiresIn: 1800 // 30 minutes
    })
  }
}

// Exporting defined schema
export default mongoose.model<UserInterface>('User', UserSchema)
