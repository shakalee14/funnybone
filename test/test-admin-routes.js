const chai = require('chai')
const server = require('../server.js')
const chaiHttp = require('chai-http')
const should = chai.should()
const adminRoutes = require('../routes/admin.js')

chai.use(chaiHttp)

describe('Admin Route tests', function(){
  it('shouldnt allow a user who is not logged in to view the admin page', function(done){
    chai.request(server)
      .get('/admin')
      .end(function( err, res){
        res.should.have.status(404)
        done()
      })
  })
})
