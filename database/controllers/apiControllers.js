import { default as request} from 'request-promise'
import ForecastIo from 'forecastio'
import { majorKeys } from '../../server/keys'

const apiControllers = {

    nameToZip: (city, state) => {
        const options = {
            method: 'GET',
            uri: encodeURI(`http://www.zipcodeapi.com/rest/city-zips.json/${city}/${state}`),
            qs: {
                access_token: majorKeys.zipKeyJS
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }
        return request(options)
            .then(response => {
                return response.zip_codes[0]})
            .catch( error => error )
      },

}

export default apiControllers
