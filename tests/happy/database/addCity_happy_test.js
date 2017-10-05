import test from 'ava'
import sinon from 'sinon'
import { Handlers } from '../../../database/handlers/index'

test.before( t => {
    sinon.spy( Handlers, 'addCity' )
})

test.after( t => {
    Handlers.deleteCity( 92562 )
})

test.serial( 'should take an object with name and zip_code properties and insert into the database', t => {
    return Handlers.addCity( { name: 'Murrieta', zip_code: 92562 } ).then( response => {
        t.true( Handlers.addCity.called, 'Function not called.' )
        t.truthy( response, 'No response received.' )
        t.is( response.status, 'success', 'response did not return expected status' )
        t.is( response.message, 'Added city.', 'response did not return expected message' )
    })
})

test.serial( 'Should throw an error if attempting to insert a zip_code already existant in the database.', t => {
    return Handlers.addCity( { name: 'Murrieta', zip_code: 92562 } ).catch( error => {
        t.truthy( error, 'Error not present' )
        t.is( error.name, 'error' )
        t.is( error.code, '23505' )
        t.is( error.detail, 'Key (zip_code)=(92562) already exists.' )
    })
})