/**
 * Created by ideans on 21/04/2017.
 */
import test from 'ava'
import sinon from 'sinon'
import { apiHandlers } from '../../../database/handlers/index'
import { majorKeys } from '../../../server/keys'
import nock from 'nock'

test.before( () => {
    nock( 'https://www.zipcodeapi.com' )
        .persist()
        .get( `/rest/city-zips.json/Los%20Angeles/ca?access_token=${majorKeys.zipKeyJS}` )
        .reply( 200, { zip_codes: ['11111', '12345'] } )
        .get( `/rest/city-zips.json/places/zz?access_token=${majorKeys.zipKeyJS}` )
        .reply( 200, [] )

    sinon.spy( apiHandlers, 'nameToZip' )
})

test( 'takes a city name and state and returns a zipcode associated with that city.', async t => {
    await apiHandlers.nameToZip( "Los Angeles", "ca" ).then( response => {
        t.truthy( response, 'Response not present.' )
        t.is( response, '11111', 'Returned unexpected zipcode.' )
        t.true( apiHandlers.nameToZip.called, 'Handler nameToZip was not called.' )
    })
})

test( 'throws an error if input is a city or state that does not exits.', async t => {
   await apiHandlers.nameToZip( "places", "zz" ).catch( error => {
        t.truthy( error, 'Error was not thrown.' )
    })
})