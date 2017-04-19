import nock from 'nock'
import chai from 'chai'
import { default as chaiHttp } from 'chai-http'
import { expect } from 'chai'
import { majorKeys } from '../../server/keys'
const should = chai.should()

chai.use( chaiHttp )

import { apiControllers } from '../../database/controllers'



describe('\napiControllers\n', () => {
  let urlDomain = 'http://www.zipcodeapi.com'
  let urlPath = '/rest/city-zips.json/Los%20Angeles/ca'

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
      .query({ access_token: majorKeys.zipKeyJS })
      .reply( 503, 'Invalid City' )

    it( 'returns an error when provided invalid input.', () => {
        apiControllers.nameToZip('Los Angeles', 'vvv')
            .catch( response => {
                expect( response.name ).to.eql( 'StatusCodeError' )
                expect( response.message ).to.eql( '503 - "Invalid City"' )
            })
    })

    })
})

describe('zipToLatLng', () => {
  let urlDomain = 'http://www.zipcodeapi.com'
  let urlPath = '/rest/info.json/94529/degrees'
  context('takes zip code and returns coordinates', () => {
    nock( urlDomain )
      .get(urlPath)
      .query({ access_token: majorKeys.zipKeyJS })
      .reply(200, {
        "zip_code": "94529",
        "lat": 37.869991,
        "lng": -122.040017,
        "city": "Concord",
        "state": "CA",
        "timezone": {
           "timezone_identifier": "America/Los_Angeles",
           "timezone_abbr": "PDT",
           "utc_offset_sec": -25200,
           "is_dst": "T"
        },
        "acceptable_city_names": [
           {
               "city": "Chevron",
               "state": "CA"
           },
           {
               "city": "Chevron Usa Inc",
               "state": "CA"
           }
        ]
})
    it('returns coordinates object with Lat, Lng properties', () => {
      apiControllers.zipToLatLng(94529)
        .then( response => {
          expect( response.lat ).to.eql(37.869991)
          expect( response.lng ).to.eql(-122.040017)
        })
    })
    nock( urlDomain )
      .get(urlPath)
      .query({ access_token: majorKeys.zipKeyJS })
      .reply(404, {
        "error_code": 400,
        "error_msg": "Invalid request."
      })
    it('should thow an error if input is NaN', () => {
      apiControllers.zipToLatLng('not a zip')
        .catch( error => {
          expect(error).to.not.be.null
        })
    })
    nock( urlDomain )
      .get(urlPath)
      .query({ access_token: majorKeys.zipKeyJS })
      .reply(404, {
         "error_code": 404,
         "error_msg": "Zip code \"99997\" not found."
       })
    it('should return an error if given invalid zip', () => {
      apiControllers.zipToLatLng(99997)
        .catch( error => {
          expect(error).to.not.be.null
        })
    })
  })
})
