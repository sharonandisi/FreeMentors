import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../server';
import userModel from '../models/userModel';
import '../../config';
import testdata from './mockdata/user'
import authHelper from '../helpers/auth';
import User from '../controllers/userController';

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
        token = 'code';
        const res = await exec();
        expect(res).to.have.status(401);
    });

    it('should notify a user if there are no mentors registered in the app', async () => {
        const user = User.create({ ...testdata.user001 });
        token = authHelper.generateToken(user.id);
        const res = await exec();
        expect(res).to.have.status(404);
    });

    it('should get mentors in the app if the user is authenticated', async () => {
        const user = User.create({ ...testdata.user001 });
        token = generateToken(user.id);
        User.changeRole(user.id);

        const res = await exec();
        expect(res).to.have.status(200);
    });
});

