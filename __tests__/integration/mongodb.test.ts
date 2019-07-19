import { describe, it } from 'mocha'
import { expect } from 'chai'
import { mongoConection } from '../../src/config/config'
import mongoose = require('mongoose')

mongoose.Promise = global.Promise

describe('MongoDB Connection', () : void => {
  it('should be able to connect to MongoDB Atlas', async (done) : Promise<void> => {
    mongoose.connect(mongoConection, { useNewUrlParser: true })
    expect(mongoose.connection.readyState).to.equal(1)
    done()
  }).timeout(5000)
})
