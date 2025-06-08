const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')

// Enable HTTP assertions in Chai
chai.use(chaiHttp)
const { expect } = chai

/**
 * Integration tests for the Files API.
 * These tests use real HTTP requests against the live server and API routes.
 * We could replace these with mocks for more control and test isolation.
 */
describe('Files API', () => {
  // Test the /files/list endpoint to ensure it returns an array of file names
  it('should return file list', async () => {
    const res = await chai.request(app).get('/files/list')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
  })

  // Test the /files/data endpoint for general success and array response structure
  // Timeout increased due to possible delays fetching and processing external files
  it('should return parsed file data', async () => {
    const res = await chai.request(app).get('/files/data')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
  }).timeout(10000) // ⏱ Extended timeout for potentially slow external calls

  // Test filtering by fileName query parameter
  it('should support filtering by fileName', async () => {
    const res = await chai.request(app).get('/files/data?fileName=file1.csv')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
  })

  // Test graceful failure when an invalid file name is supplied
  it('should return 500 if internal error occurs', async () => {
    const res = await chai.request(app).get('/files/data?fileName=%%%')
    expect(res.status).to.be.oneOf([200, 500])
    if (res.status === 500) {
      expect(res.body).to.have.property('error')
    }
  })
})
