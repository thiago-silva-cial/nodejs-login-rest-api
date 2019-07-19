import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as request from 'supertest'
import app from '../../src/app'

describe('API GET', () : void => {
  it('should return http status 200', async () : Promise<void> => {
    let result = await request(app).get('/')
    expect(result.status).to.equal(200)
  })
})
