const chai = require('chai')
const server = require('../server.js')
const chaiHttp = require('chai-http')
const should = chai.should()
const adminRoutes = require('../routes/admin.js')

chai.use(chaiHttp)

describe('Admin Route tests', function(){
  it('shouldnt allow a visitor to visit the apparel route', function(done){
    chai.request(server)
      .get('/apparel')
      .end(function( err, res){
        res.should.have.status(200)
        done()
      })
  })
})
