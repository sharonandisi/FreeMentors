import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import User from '../models/userModel';
import '../../config';
import testdata from './mockdata/user'
import authHelper from '../helpers/auth';
import Session from '../models/sessionModel';

chai.use(chaiHttp);
const { expect,  request } = chai;

describe('POST /api/v1/sessions/sessions', () => {
    beforeEach(() => {
        User.remove();
        Session.remove();
    });

    let session = {};
    let token = '';

    const execute = () => request(app)
          .post('/api/v1/sessions/sessions')
          .send(session)
          .set('x-auth-token', token);
    it('should not create a session with no mentor', async () => {
        const user = User.create({ ...testdata.user001});
        token = authHelper.generateToken(user.id);
        session = testdata.session002;
        const res = await execute();

        expect(res).to.have.status(400);
    })

});

describe ('PATCH /api/v1/sessions/:sessionid/accept', () => {
    beforeEach(() => {
        User.remove();
        Session.remove();
    });

    let sessionid = '';
    let session = {};
    let token = '';

    const execute = () => request(app)
        .patch(`/api/v1/sessions/sessions/${sessionid}/accept`)
        .set('x-auth-token', token);

    it('should allow a mentor to accept a session ', async () => {
        const { id: mentorid } = User.create({...testdata.user001});
        User.changeMentor(mentorid);
        token = authHelper.generateToken(mentorid);

        const { id: menteeid } = User.create({...testdata.user003});
        const { questions } = testdata.session001;
        const newSession = Session.create({ mentorid, menteeid, questions });

        sessionid = newSession.id;
        const res = await execute();
        expect(res).to.have.status(200);
    });
});

describe('PATCH /api/v1/sessions/sessions/:sessionid/reject', () => {
    beforeEach(() => {
        User.remove();
        Session.remove();
    });
    let sessionid = '';
    let token = '';
    let session = {};
    

    const execute = () => request(app)
        .patch(`/api/v1/sessions/sessions/${sessionid}/reject`)
        .set('x-auth-token', token);

    it('should allow a mentor to reject a session ', async () => {
        const { id: mentorid } = User.create({ ...testdata.user001 });
        User.changeMentor(mentorid);
        token = authHelper.generateToken(mentorid);

        const { id: menteeid } = User.create({ ...testdata.user001 });
        const { questions } = testdata.session001;
        const newSession = Session.create({ mentorid, menteeid, questions });

        sessionid = newSession.id;
        const res = await execute();
        expect(res).to.have.status(200);
    });
});
