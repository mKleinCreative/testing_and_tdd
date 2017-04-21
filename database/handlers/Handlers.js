import knex from '../knex'

const Handlers = {
    getCityByZipCode: zipCode => {
        return knex('cities').select().where({ zip_code: zipCode })
            .then( response => {
                return response[0]
            })
            .then( city => {
                if (city) return { status: 'success', data: city, message: 'Retrieved city.'}
                else throw new Error( 'No city with that zipcode found.' )
            })
            .catch( error => {
                throw error
            })
    },

    getCityByName: name => {
        return knex('cities').select().where({ name: name })
            .then( response => response[0] )
            .then( city => {
                if (city) return { status: 'success', data: city, message: 'Retrieved city.' }
                else throw new Error( 'No city with that name found.' )
            })
            .catch( error => {
                throw error
            })
    },

    addCity: cityObj => {
        return knex('cities').insert( cityObj )
            .then( () => {
                return { status: 'success', message: 'Added city.' }
            })
            .catch( error => {
                throw error
            })
    },

    deleteCity: input => {
        let query = parseInt(input) ? { zip_code: input } : { name: input }
            return knex('cities').where( query ).del()
                .then( () => {
                    return { status: 'success', message: 'Deleted city.' }
                })
    }

}

export default Handlers