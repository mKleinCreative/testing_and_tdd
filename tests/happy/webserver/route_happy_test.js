// import { expect } from 'chai'
// import chai from 'chai'
// import { default as chaiHttp } from 'chai-http'
// const should = chai.should()
//
// import server from '../../server/server'
//
// chai.use(chaiHttp)
//
// describe('routes', () => {
//
//   context('/ route', () => {
//     it('should return 200', done => {
//       chai.request(server)
//       .get('/')
//       .end( (err, res) => {
//         res.status.should.equal(200)
//         done()
//       })
//     })
//     it('should return 404 upon route failure', done => {
//       chai.request(server)
//       .get('/notathing')
//         .end( (error, res) => {
//           error.should.have.status(404)
//           error.response.body.error.status.should.eql(404)
//           done()
//         })
//     })
//   })
//
// })

import test from 'ava'
import sinon from 'sinon'
