'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const Entry = require('../../models/entry');
const mongoose = require('mongoose');

const expect = chai.expect;
const request = chai.request;

const dbPort = process.env.MONGLAB_URI;
require('../../server');

describe('Blog router tests', () => {

  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('Catch all test', () => {

    it('should respond to a request to a random route with an error', (done) => {
      request('localhost:3000')
      .get('/test')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('tests that don\'t need data', () => {
    it('should get a list of blog entries', (done) => {
      request('localhost:3000')
      .get('/blog')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });

    it('should post a blog', (done) => {
      request('localhost:3000')
      .post('/blog')
      .send(
        {
          title:'test title',
          content:'test content'
        })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.title).to.eql('test title');
        expect(res.body.content).to.eql('test content');
        done();
      });
    });

    describe('tests that need data', () => {
      let testEntry;
      let token;

      before((done) => {
        request('localhost:3000')
        .post('/signup')
        .send({username:'test', password:'test'})
        .end((err, res) => {
          token = res.body.token;
          done();
        });
      });

      beforeEach((done) => {
        testEntry = new Entry({
          title:'test title',
          content:'test content'
        });

        testEntry.save((err) => {
          if (err) return console.log('Error: ', err);
          done();
        });
      });

      it('should update an entry with a PUT request', (done) => {
        testEntry.title = 'updatedByTest';
        request('localhost:3000')
          .put('/blog/')
          .set('token', token)
          .send(testEntry)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.eql({message:'successfully updated'});
            done();
          });
      });

      it('should delete a plant', (done) => {
        request('localhost:3000')
        .delete(`/blog/${testEntry._id}`)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.eql({message: 'successfully deleted'});
          done();
        });
      });
    });
  });
});
