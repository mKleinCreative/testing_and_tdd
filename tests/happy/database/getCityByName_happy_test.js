import sinon from 'sinon'
import test from 'ava'
import { Handlers } from '../../../database/handlers/index'

test.before( t => {
    sinon.spy( Handlers, 'getCityByName' )
})

test( 'should return a city object from the database when given a matching name.', t => {
    return Handlers.getCityByName( 'Seattle' ).then( response => {
        t.is( response.status, 'success')
        t.is( response.message, 'Retrieved city.', ['Error in checking response message.'] )
        t.is( response.data.zip_code, 98101 )
        t.true( Handlers.getCityByName.called, 'Function was not called.' )
        })
})

test( 'should throw an error when given a city name not found in the database.', t => {
    return Handlers.getCityByName( 'Gotham' ).catch( error => {
        t.truthy( error, 'error is not present' )
        t.true( Handlers.getCityByName.called, 'Function was not called.' )
    })
})