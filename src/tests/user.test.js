import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import userModel from '../models/userModel';

const users = userModel.users;
const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/Auth', () => {
  describe('/POST signup', () => {
    it('should successfully sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(201);
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing a firstname', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: '',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Firstname is required with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing a lastname', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: '',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Lastname is required with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing an email address', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: '',
          password: '123shay',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required and must be valid');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing a password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing an address', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: '',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Address is a required field with a min of 3 chars');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing a bio', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: 'nairobi',
          bio: '',
          occupation: 'developer',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Bio is a required field with a min of 5 chars with no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing an occupation', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: '',
          expertise: 'software',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Occupation is a required field with a min of 3 chars with no special chars and numbers');
          if (err) return done();
          done();
        });
    });

    it('should not sign up a user missing an expertise', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'sharon',
          lastname: 'andisi',
          email: 'sharonandisi@gmail.com',
          password: '123shay',
          address: 'nairobi',
          bio: 'mama simi',
          occupation: 'developer',
          expertise: '',
          mentorstatus: 'false',
          is_Admin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Expertise is a required field with a min of 3 chars with no special chars and numbers');
          if (err) return done();
          done();
        });
    });
  });

  describe('/POST signin', () => {

    it('should successfully sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'sharonandisi@gmail.com',
          password: '123shay',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not sign in a user missing an email address', (done) =>{
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: '123shay',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error)
            .equals('Email is a required field and must be valid');
          if (err) return done();
          done();
        });
    });

    it('should not sign in a user missing a password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'sharonandisi@gmail.com',
          password: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error)
            .equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });
  });
});
