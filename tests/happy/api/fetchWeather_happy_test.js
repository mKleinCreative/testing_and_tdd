import test from 'ava'
import sinon from 'sinon'
import nock from 'nock'
import { apiHandlers } from '../../../database/handlers'

test.before( () => {
    nock( 'https://api.darksky.net' )
        .get( "/forecast/37.86999,-122.040017?api_key=9f5c9bfa48e038f5a07bc182e612eaa9&exclude%5B0%5D=minutely&exclude%5B1%5D=hourly&exclude%5B2%5D=daily&exclude%5B3%5D=alerts&exclude%5B4%5D=flags" )
        .reply( 200, {
            "latitude": 37.869991,
            "longitude": -122.040017,
            "timezone": "America/Los_Angeles",
            "offset": -7,
            "currently": {
                "time": 1492816130,
                "summary": "Clear",
                "icon": "clear-day",
                "nearestStormDistance": 457,
                "nearestStormBearing": 35,
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 77.18,
                "apparentTemperature": 77.18,
                "dewPoint": 49.42,
                "humidity": 0.38,
                "windSpeed": 5.5,
                "windBearing": 319,
                "visibility": 10,
                "cloudCover": 0.09,
                "pressure": 1016.71,
                "ozone": 301.23
            }
        })
        .get( "/forecast/999999,-999999?api_key=9f5c9bfa48e038f5a07bc182e612eaa9&exclude%5B0%5D=minutely&exclude%5B1%5D=hourly&exclude%5B2%5D=daily&exclude%5B3%5D=alerts&exclude%5B4%5D=flags" )
        .reply( 400, {
                "code": 400,
                "error": "The given location is invalid."
            }

        )
    sinon.spy( apiHandlers, 'fetchWeather' )
})

test( 'take a set of coordinates and returns an object with weather information for that zip code.', async t => {
    await apiHandlers.fetchWeather({ lat: 37.86999, lng: -122.040017 }).then( response => {
        t.truthy( response, 'Response is not present.' )
        t.is( response.latitude, 37.869991, 'Unexpected latitude received.' )
    })
})

test( 'throws an error if invalid coordinates are provided.', async t => {
    await apiHandlers.fetchWeather({ lat: 999999, lng: -999999 }).catch( error => {
        t.truthy( error, 'Error is not present.')
    })
})