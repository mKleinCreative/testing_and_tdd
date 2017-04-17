const express = require('express')
const server = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

server.use( morgan('dev') )
server.use( bodyParser.urlencoded({extended: false}) )
server.use( bodyParser.json() )
const router = express.Router()

server.get('/', (req, res, next) => {
  res.status(200).send('Weather goes here')
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
