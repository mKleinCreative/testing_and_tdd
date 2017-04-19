import chai from 'chai'
import { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Controllers } from '../../database/controllers'

chai.use( chaiAsPromised )

describe( '\nDATABASE CONTROLLERS\n', () => {

    context('getCityByZipCode()', () => {
        it('should return a city object with a matching zip code property.', () => {
            return Promise.resolve(Controllers.getCityByZipCode('22434'))
                .then(response => {
                    expect(response.status).to.eql('success')
                    expect(response.message).to.eql('Retrieved city.')
                    let city = response.data
                    expect(city).to.have.property('name')
                    expect(city.name).to.eql('San Diego')
                    expect(city.zip_code).to.eql(22434)
                }).then(() => {
                    return Promise.resolve(Controllers.getCityByZipCode('11111'))
                        .then(error => {
                            expect(error.message).to.eql('No city with that zipcode found.')
                        })
                })
        })
    })

    context('getCityByName()', () => {
        it('should return a city object with a matching name property.', () => {
            return Promise.resolve(Controllers.getCityByName('Seattle'))
                .then( response => {
                    expect(response.status).to.eql('success')
                    expect(response.message).to.eql('Retrieved city.')
                    let city = response.data
                    expect(city).to.have.property('name')
                    expect(city.name).to.eql('Seattle')
                    expect(city.zip_code).to.eql(98101)
                }).then( () => {
                    return Promise.resolve(Controllers.getCityByName('Gotham'))
                        .then(error => {
                            expect(error.message).to.eql('No city with that name found.')
                        })
                })
        })
    })

    context('addCity()', () => {
        it('should insert a city object into the database.', () => {
            return Promise.resolve(Controllers.addCity({ name: 'Murrieta', zip_code: 92562 }))
                .then( response => {
                    expect(response.status).to.eql('success')
                    expect(response.message).to.eql('Added city.')
                })
                .then( () => {
                    return Promise.resolve(Controllers.getCityByName('Murrieta'))
                        .then( response => {
                            expect(response.status).to.eql('success')
                            expect(response.message).to.eql('Retrieved city.')
                            let city = response.data
                            expect(city).to.have.property('name')
                            expect(city.name).to.eql('Murrieta')
                            expect(city.zip_code).to.eql(92562)
                        })
                        .then( () => {
                            return Promise.resolve( Controllers.addCity({ name: 'Murrieta', zip_code: 92562 }) )
                                .then( response => {
                                    expect( response.error ).to.not.be.null
                                })
                        })
                })
        })
    })

    context('deleteCity()', () => {
        it( 'should delete a city from the database.', () => {
            return Promise.resolve( Controllers.deleteCity( 92562 ) )
                .then( response => {
                    expect( response.status ).to.eql( 'success' )
                    expect( response.message ).to.eql( 'Deleted city.' )
                })
                .then( () => {
                    return Promise.resolve( Controllers.getCityByName( 'Murrieta' ) )
                        .then( response => {
                            expect( response.error ).to.not.be.null
                        })
                })
        })
    })
})