/**
 * Created by ideans on 20/04/2017.
 */
import { Handlers } from '../../../database/handlers/index'
import test from 'ava'
import sinon from 'sinon'

test( 'should return a city object from the database if given an existing zipcode.', t => {
   sinon.spy( Handlers, 'getCityByZipCode' )
    return Handlers.getCityByZipCode(22434).then( resp =>  {
        t.is(resp.status, 'success')
        t.is( resp.message, 'Retrieved city.', ['Error in checking response message.'] )
        t.is( resp.data.name, 'San Diego')
        t.true( Handlers.getCityByZipCode.called )
    })
})

test( 'should throw an error if given a zipcode not found in the database.', t => {
    return Promise.resolve( Handlers.getCityByZipCode(11111) )
                  .catch( error => {
                      t.not( error, null, ['Error is not Null'])
                      t.is( error.message, 'No city with that zipcode found.' )
                     t.true( Handlers.getCityByZipCode.called )
                  })
})