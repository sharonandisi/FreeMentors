import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import User from '../models/userModel';
import '../../config';
import testdata from './mockdata/user'
import authHelper from '../helpers/auth';


const users = userModel.users;
const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/GET  all mentors', () => {
    beforeEach(() => {
        User.remove();
    });

    let token = '';
    const execute = () => request(app)
          .get('/api/v1/mentors')
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

describe('GET /api/v1/mentors:mentorId', () => {
    beforeEach(() => {
        User.remove();
    });

    let token = '';
    let mentorid = '';

    const execute = () => request(app)
        .get(`/api/v1/mentors/${mentorid}`)
        .set('x-auth-token', token);

    it('should not get a specific mentor if the user has no token', async () => {
        const user = User.create({ ...data.user001 });
        const mentor = User.changeMentor(user.id);
        token = '';
        mentorid = mentor.id;
        const res = await execute();
        expect(res).to.have.status(401);
    });

    it('shouldnt get a mentor when user has an invalid token', async () => {
        const user = User.create({ ...data.user001 });
        const mentor = User.changeMentor(user.id);
        token = 'sigh';
        mentorid = mentor.id;
        const res = await execute();
        expect(res).to.have.status(401);
    });

    it('should throw error if mentor does not exist', async () => {
        const user = User.create({ ...data.user001 });
        const mentor = User.changeMentor(user.id);
        token = 'sellah';
        mentorid = '1002';
        const res = await execute();
        expect(res).to.have.status(404);
    });

    it('should get a specific mentor if user is authenticated', async () => {
        const user = User.create({ ...data.user001 });
        token = authHelper.generateToken(user.id);
        const user =User.changeMentor(user.id);
        mentorid = user.id;

        const res = await execute();
        expect(res).to.have.status(200);
    });
});

describe('GET /api/v1/mentors:mentorId', () => {
    beforeEach(() => {
        User.remove();
    });

    let token = '';
    let mentorid = '';

    const execute = () => request(app)
        .get(`/api/v1/mentors/${mentorid}`)
        .set('x-auth-token', token);

    it('should not get a specific mentor if the user has no token', async () => {
        const user = User.create({ ...data.user001 });
        const mentor = User.changeMentor(user.id);
        token = '';
        mentorid = mentor.id;
        const res = await execute();
        expect(res).to.have.status(401);
    });

    it('should throw error if mentor does not exist', async () => {
        const user = User.create({ ...data.user001 });
        const mentor = User.changeMentor(user.id);
        token = 'sellah';
        mentorid = '1002';
        const res = await execute();
        expect(res).to.have.status(404);
    });

    it('should get a specific mentor if user is authenticated', async () => {
        const user = User.create({ ...data.user001 });
        token = authHelper.generateToken(user.id);
        const user = User.changeMentor(user.id);
        mentorid = user.id;

        const res = await execute();
        expect(res).to.have.status(200);
    });
});

