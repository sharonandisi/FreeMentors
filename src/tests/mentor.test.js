import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import User from '../models/userModel';
import '../../config';
import testdata from './mockdata/user'
import authHelper from '../helpers/auth';


const users = User.users;
const { expect} = chai;
chai.should();
chai.use(chaiHttp);

describe('/GET  all mentors', () => {
    beforeEach(() => {
        User.remove();
    });

    let token = '';
    const execute = () => chai.request(app)
          .get('/api/v1/mentors/mentors')
          .set('x-auth-token', token);

    it('should not get mentors when the user has no token', async () => {
        token = '';
        const res = await execute();
        expect(res).to.have.status(401);
    });

    it('should not get mentors if the user has an invalid token', async () => {
        token = 'sha23563rwe';
        const res = await execute();
        expect(res).to.have.status(401);
    });

    it('should throw an error if there are no mentors found', async () => {
        const user = User.create({ ...testdata.user001 });
        token = authHelper.generateToken(user.id);
        const res = await execute();
        expect(res).to.have.status(404);
    });

    it('should get mentors if user is authenticated', async () => {
        const user = User.create({ ...testdata.user001 });
        token = authHelper.generateToken(user.id);
        User.changeMentor(user.id);

        const res = await execute();
        expect(res).to.have.status(200);
    });
});

describe('GET /api/v1/mentors/mentors/:mentorid', () => {
    beforeEach(() => {
        User.remove();
    });
    let mentorid = '';
    let token = '';

    const execute = () => chai.request(app)
          .get(`/api/v1/mentors/mentors/${mentorid}`)
          .set('x-auth-token', token);
    
    it('should not get a mentor if the user making the request has no token', async () =>{
        token = '';
        const res = await execute();
        expect(res).to.have.status(401);
    });

    it('should not get a mentor if the user has an invalid token', async () => {
        token = 'sha23563rwe';
        const res = await execute();
        expect(res).to.have.status(401);

    })

    it('should throw an error if there are no mentors found', async () => {
        const user = User.create({ ...testdata.user001 });
        token = authHelper.generateToken(user.id);
        const res = await execute();
        expect(res).to.have.status(404);
    })

    
    it('should get a mentor if user is authenticated', async () => {
        const user = User.create({ ...testdata.user001 });
        token = authHelper.generateToken(user.id);
        User.changeMentor(user.id);

        const res = await execute();
        expect(res).to.have.status(200);
    });

});