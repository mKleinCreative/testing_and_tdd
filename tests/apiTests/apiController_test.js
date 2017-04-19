import { expect } from 'chai'
import chai from 'chai'
import { default as chaiHttp } from 'chai-http'
import nock from 'nock'
const should = chai.should()

import apiControllers from '../../database/controllers/apiControllers'

const urlDomain = 'https://www.zipcodeapi.com'
const urlPath = '/rest/ReiGH9WslgpgCnX2ewoD1qrUyqAwLhoDwGjdQgGcw5t9tqbHXAlY0MTydt5YLtBh/city-zips.json/oakland/ca'
describe('apiControllers', () => {

  context('request should be successful', () => {
    // nock(urlDomain)
    // .get(urlPath)
    // .reply(200, {
    //   response: {
    //     message: 'success',
    //     err: 'fake error',
    //     body: ['12345', '54321']
    //   }

    it.only('should return 200', () => {
      return Promise.resolve(apiControllers.nameToZip('oakland', 'ca'))
      .then( response => {
        console.log('nock ::', response)
      })
      // chai.request(urlDomain)
      //   .get(urlPath)
      //   .end( ( err, res ) => {
      //     res.status.should.equal(200)
      //     done()
      //   })

    })
  })
})
