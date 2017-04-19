import knex from '../knex'

const Controllers = {
    getCityByZipCode: zipCode => {
        return knex('cities').select().where({ zip_code: zipCode })
            .then( response => response[0] )
            .then( city => {
                if (city) return { status: 'success', data: city, message: 'Retrieved city.'}
                else throw new Error( 'No city with that zipcode found.' )
            })
            .catch( error => error )
    },

    getCityByName: name => {
        return knex('cities').select().where({ name: name })
            .then( response => response[0] )
            .then( city => {
                if (city) return { status: 'success', data: city, message: 'Retrieved city.' }
                else throw new Error( 'No city with that name found.' )
            })
            .catch( error => error )
    },

    addCity: cityObj => {
        return knex('cities').insert( cityObj )
            .then( response => {
                return { status: 'success', message: 'Added city.' }
            })
            .catch( error => error )
    },

    deleteCity: input => {
        let query = parseInt(input) ? { zip_code: input } : { name: input }
            return knex('cities').where( query ).del()
                .then( count => {
                })
                .then( () => {
                    return { status: 'success', message: 'Deleted city.' }
                })
    }

}

export default Controllers

console.log('stuff')