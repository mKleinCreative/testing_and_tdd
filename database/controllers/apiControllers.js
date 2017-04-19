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
            .catch( error => {
              throw error
            })
      },
      zipToLatLng: input => {
        const zip = parseInt(input) ? parseInt(input) : null
        const options = {
            method: 'GET',
            uri: encodeURI(`http://www.zipcodeapi.com/rest/info.json/${zip}/degrees`),
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
                return {lat: response.lat, lng: response.lng}
            })
      }

}

export default apiControllers
apiControllers.zipToLatLng(94529).then(response => {console.log(response)})
