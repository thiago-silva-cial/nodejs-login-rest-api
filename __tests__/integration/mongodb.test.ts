import { describe, it } from 'mocha'
import { assert } from 'chai'
import { mongoConection } from '../../src/config/config'
import User from '../../src/models/user'
import userMock from '../utils/userMock'
import mongoose = require('mongoose')

mongoose.Promise = global.Promise

describe('MongoDB Atlas - CRUD test', () : void => {
  it('should be able to connect to mongo', (done) : void => {
    // If connect, the connection pool won't be closed for the next tests
    mongoose.connect(mongoConection, { useNewUrlParser: true })
      .then((result) : void => done())
      .catch((err) : void => done(err))
  }).timeout(5000)

  it('should be able to register a new user', async () : Promise<void> => {
    return new Promise((resolve, reject) : void => {
      User.create(userMock)
        .then((result) : void => {
          assert.ok(result)
          resolve()
        })
        .catch((err) : void => reject(err))
        .finally(() : void => { mongoose.connection.close() })
    })
  }).timeout(30000)
})
