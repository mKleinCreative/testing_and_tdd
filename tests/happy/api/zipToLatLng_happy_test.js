import test from 'ava'
import sinon from 'sinon'
import nock from 'nock'
import { apiHandlers } from '../../../database/handlers'
import { majorKeys } from '../../../server/keys'

test.before( () => {
    nock( 'https://www.zipcodeapi.com' )
        .persist()
        .get( `/rest/info.json/92562/degrees?access_token=${majorKeys.zipKeyJS}` )
        .reply( 200, {
            "zip_code": "92562",
            "lat": 33.547594,
            "lng": -117.344043,
            "city": "Murrieta",
            "state": "CA",
            "timezone": {
                "timezone_identifier": "America/Los_Angeles",
                "timezone_abbr": "PDT",
                "utc_offset_sec": -25200,
                "is_dst": "T"
            },
            "acceptable_city_names": [
                {
                    "city": "Murrieta Hot Springs",
                    "state": "CA"
                }
            ]
        } )
        .get( `/rest/info.json/99991/degrees?access_token=${majorKeys.zipKeyJS}` )
        .reply( 404, {
            "error_code": 404,
            "error_msg": "Zip code \"99991\" not found."
        } )

    sinon.spy( apiHandlers, 'zipToLatLng' )
})

test( 'takes a zipcode and returns an object containing the cities location information.', async t => {
    await apiHandlers.zipToLatLng( 92562 ).then( response => {
        t.truthy( response, 'Response not received.' )
        t.is( response.lat,  33.547594, 'Incorrect lattitude.' )
        t.is( response.lng, -117.344043, 'Incorrect longitude.' )
    })
})

test( 'throws an error when an invalid zip code is supplied.', async t => {
    await apiHandlers.zipToLatLng( 99991 ).catch( error => {
        t.truthy( error, 'Error not present.' )
        t.is( error.statusCode, 404, 'Unexpected error code.' )
        t.is( error.message,
            '404 - {"error_code":404,"error_msg":"Zip code \\"99991\\" not found."}',
            'Unexpected Error Message.')
    })
})