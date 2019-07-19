// Interfaces
import UserInterface from '../interfaces/UserInterface'
// Libs
import { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose = require('mongoose')

// Mongoose schema definition
const UserSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true
  },
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
    required: true
  },
  telefones: {
    type: Array,
    required: false
  },
  dataCriacao: {
    type: Date,
    required: true,
    default: Date.now },
  dataAtualizacao: {
    type: Date,
    required: true,
    default: Date.now },
  ultimoLogin: {
    type: Date,
    required: true,
    default: Date.now }
})

// Mongoose handlers
UserSchema.pre('save', async (next) : Promise<void> => {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

// Definie some methods to the User schema
UserSchema.methods = {
  compareHash (hash) : boolean {
    return bcrypt.compare(hash, this.password)
  },
  generateToken () : string {
    return jwt.sign({ id: this.id }, 'secret', {
      expiresIn: 86400
    })
  }
}

// Exporting defined schema
export default mongoose.model<UserInterface>('User', UserSchema)
