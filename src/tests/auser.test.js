import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import User from '../models/userModel';
import '../../config';
import testdata from './mockdata/user'
import authHelper from '../helpers/auth';

const users = User.users;
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
          password: 'shayert',
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
          password: 'shayert',
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

  describe('PATCH /api/v1/auth/:userid', () => {
    beforeEach(() => {
      User.remove();
    });

    let userid = '';
    let token = '';

    const execute = () => chai.request(app)
      .patch(`/api/v1/auth/${userid}`)
      .set('x-auth-token', token);

    it('should not allow an admin access with no token', async () => {
      userid = '234567';
      token = '';
      const res = await execute();
      expect(res).to.have.status(401);
    });

    it('should not allow an admin access with invalid token', async () => {
      userid = '234567';
      token = '';
      const res = await execute();
      expect(res).to.have.status(401);
    });

    it('should not change roles of a non existant user', async () => {
      User.createAdmin({ ...testdata.admin });
      const admin = User.findByEmail(process.env.ADMIN_EMAIL);
      token = authHelper.generateToken(admin.id);
      userid = 2765786;
      const res = await execute();
      expect(res).to.have.status(404);
    });

    it('should check for admin before allowing change of status', async () => {
      const { user001 } = testdata;
      const user = User.create({ ...user001});
      token = authHelper.generateToken(user.id);
      userid = user.id;
      const res = await execute();
      expect(res).to.have.status(403);
    });

    it('should allow an admin to change a status',async () => {
      const { user001 } = testdata;
      const user = User.create({ ...user001 });
      userid = user.id;
      User.createAdmin({ ...testdata.admin });
      const admin = User.findByEmail(process.env.ADMIN_EMAIL);
      token = authHelper.generateToken(admin.id);
      const res = await execute();
      expect(res).to.have.status(200);
    });

  })
});
