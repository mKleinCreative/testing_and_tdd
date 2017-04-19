import nock from 'nock'
import chai from 'chai'
import { default as chaiHttp } from 'chai-http'
import { expect } from 'chai'
const should = chai.should()

chai.use( chaiHttp )

import { apiControllers } from '../../database/controllers'

const urlDomain = 'http://www.zipcodeapi.com'
const urlPath = '/rest/city-zips.json/Los%20Angeles/ca'
const reqHeaders = { reqHeaders: { 'User-Agent': 'Request-Promise', 'Host': 'www.zipcodeapi.com', 'Accept': 'application/json' } }

describe('\napiControllers\n', () => {

  context('nameToZip()', () => {
    nock( urlDomain  )
      .get( urlPath )
      .query({ access_token: 'js-L3CZB6qGQTdETLM6OCZbiHmIexaFSOJDRmDts39iWnXQ9JWXmW9EDvnS2xxVmhye' })
      .reply( 200, { zip_codes: ['11111', '12345'] })

    it('returns a zip code retireved from the API.', () => {
        apiControllers.nameToZip('Los Angeles', 'ca')
          .then( response => {
            expect( response ).to.eql( '11111' )
          })
    })

    nock( urlDomain  )
      .get( '/rest/city-zips.json/Los%20Angeles/vvv' )
      .query({ access_token: 'js-L3CZB6qGQTdETLM6OCZbiHmIexaFSOJDRmDts39iWnXQ9JWXmW9EDvnS2xxVmhye' })
      .reply( 503, 'Invalid City' )

    it( 'returns an error when provided invalid input.', () => {
        apiControllers.nameToZip('Los Angeles', 'vvv')
            .then( response => {
                expect( response.name ).to.eql( 'StatusCodeError' )
                expect( response.message ).to.eql( '503 - "Invalid City"' )
            })
    })

    })
})
