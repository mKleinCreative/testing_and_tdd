import { Handlers } from '../../../database/handlers/index'
import test from 'ava'
import sinon from 'sinon'


test.before( t => {
    sinon.spy( Handlers, 'deleteCity')
})
test.beforeEach( t => {
    Handlers.addCity( { name: 'Temecula', zip_code: 92563 } )
})

test.afterEach( t => {
    Handlers.deleteCity( 92563 )
})

test.serial( 'should take a zip code and delete the matching city from the database.', t => {
    return Handlers.deleteCity( 92563 ).then( response => {
        t.true( Handlers.deleteCity.called )
        t.truthy( response )
        t.is( response.status, 'success' )
        t.is( response.message, 'Deleted city.' )
        t.is( Handlers.deleteCity.callCount, 1 )
    })
})

test.serial( 'should take a city name and delete the matching city from the database.', t => {
    return Handlers.deleteCity( 'Temecula' ).then( response => {
        t.true( Handlers.deleteCity.called )
        t.truthy( response )
        t.is( response.status, 'success' )
        t.is( response.message, 'Deleted city.' )
        t.is( Handlers.deleteCity.callCount, 3 )
    })
})
