let server = require('../index');
let chai = require("chai");
const { expect } = require('chai');
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Test API", () => {
    describe("Test GET route /", () => {
        it("It should return all social medias information", (done) => {
            chai.request(server)
                .get('/')
                .end((err, response) => {
                    response.should.have.status(200)
                    expect(response.body).to.have.keys('twitter', 'facebook', 'instagram')
                    done();
                })
        })
    })
})