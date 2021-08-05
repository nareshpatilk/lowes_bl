process.env.NODE_ENV = 'DEV';

let mongoose = require("mongoose");
let urlSchema = require('../app/schemas/url.schema');

//Require the dev-dependencies
let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
const shortid = require("shortid");
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('URLS', () => {
/*
  * Test the /GET route
  */
  describe('/GET all url', () => {
      it('it should GET all the urls', (done) => {
        chai.request(server)
            .get('/lowes/findAll')
            .end((err, res) => {
                console.log(`res :: ${typeof(res.body)}`);
                console.log(`res :: ${res.body}`);
                  res.should.have.status(201);
                  res.body.should.be.a('object');
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
  describe('/POST Url', () => {
  
    it('it should POST a url ', (done) => {
        let url = {
            longUrl: "https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai"
        }
      chai.request(server)
          .post('/lowes/url/save')
          .send(url)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                console.log(`post res :: ${typeof(res.body)}`);
                console.log(`post res :: ${res.body.status.message}`);
                res.body.status.should.have.property('message').eql('Successfully saved url details');
                res.body.data.should.have.property('longUrl');
                res.body.data.should.have.property('shortUrl');
                res.body.data.should.have.property('urlCode');
                res.body.data.should.have.property('clickCount');
            done();
          });
        });
    });

    describe('/GET/:shortUrl Url', () => {
        it('it should GET a url by the given shorturl', (done) => {
            const urlCode = shortid.generate();
            console.log(`short url code ${urlCode}`)
            let url = new urlSchema(
                {
                    longUrl: "https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai",
                    shortUrl:`http://localhost:3000/v1/${urlCode}`,
                    urlCode:`${urlCode}`,
                    clickCount:1,
                    __v:0
            });
            url.save((err, url) => {
                console.log(`Save new url and found`)
                chai.request(server)
            .get('/lowes/' + urlCode)
            .send(url)
            .end((err, res) => {
                    console.log(`get by dynamic id ${res.body}`)
                    console.log(`get by data  ${res.body.data}`)
                    console.log(`get by data shortUrl ${res.body.data.shortUrl}`)
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('longUrl');
                    res.body.data.should.have.property('shortUrl');
                    res.body.data.should.have.property('urlCode');
                    res.body.data.should.have.property('clickCount');
                    res.body.data.should.have.property('urlCode').eql(urlCode);
                    // res.body.should.have.property('year');
                    // res.body.should.have.property('_id').eql(book.id);
                done();
            });
            });

        });
    });

    describe('/GET particular url which is not present', () => {
        it('it should GET particular urls which is not present', (done) => {
            const urlCode = shortid.generate()+"1232312";
            console.log(`short url code ${urlCode}`)
          chai.request(server)
                .get('/lowes/' + urlCode)
              .end((err, res) => {
                  console.log(`particular url which is not :: ${typeof(res.body)}`);
                  console.log(`particular url which is not present message :: ${res.body.status.message}`);
                    res.should.have.status(404);
                    res.body.status.should.have.property('message').eql(`The short url doesn't exists`);
                done();
              });
        });
    });

});