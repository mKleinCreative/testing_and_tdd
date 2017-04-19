import { default as request} from 'request-promise'
import ForecastIo from 'forecastio'
import { majorKeys } from '../../server/keys'

const apiControllers = {
  nameToZip: (name, state) => {
    const options = {
      uri: 'https://www.zipcodeapi.com/rest/',
       qs: {
         access_token: 'js-L3CZB6qGQTdETLM6OCZbiHmIexaFSOJDRmDts39iWnXQ9JWXmW9EDvnS2xxVmhye'
       },
       headers: {
         'User-Agent': 'Request-Promise'
       },
       json: true
    }
    request(options)
      .then(response => {
        console.log('controller response::', response)
      })
  }
}



export default apiControllers
