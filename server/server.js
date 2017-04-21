const express = require('express')
const server = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const request = require('request')
const ForecastIo = require('forecastio')

server.use( morgan('dev') )
server.use( bodyParser.urlencoded({extended: false}) )
server.use( bodyParser.json() )
const router = express.Router()
var forecastIo = new ForecastIo('9f5c9bfa48e038f5a07bc182e612eaa9')

server.get('/', (req, res, next) => {
  res.status(200).send('get this weather')
})

server.use( (req, res, next) => {
  let err = new Error('aint no weather')
  err.status = 404
  next(err)
})

server.use((err, req, res, next) => {
  console.log('error status::', err.status)
  res.status(err.status || 505)
    .json({
      status: 'you fail',
      message: err.message,
      error: err
    })
})

server.listen(3000, () => {
  console.log('server listening on 3000 ')
})

module.exports = server
