const express = require('express')
const server = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

server.use( morgan('dev') )
server.use( bodyParser.urlencoded({extended: false}) )
server.use( bodyParser.json() )
const router = express.Router()

server.get('/', (req, res, next) => {
  res.send('Weather goes here')
})

server.get( (req, res, next) => {
  let error = new Error('aint no weather')
  error.status(404)
  next(error)
})

server.get((req, res, next) => {
  res.status = error.status || 505
  res.json({
    status: 'you fail',
    message: error.message
  })
})

server.listen(3000, () => {
  console.log('server listening on 3000 ')
})

module.exports = server
