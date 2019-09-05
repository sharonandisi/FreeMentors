import uuid from 'uuid';
import userModel from './userModel';

class Session {
    constructor() {
        this.sessions = [];
    }

    create(data) {
       const { mentorid, menteeid, questions } = data;
       const { email: menteeEmail } = userModel.findOne(menteeid);
       const newSession = {
           id: uuid.v4(),
           mentorid,
           menteeid,
           questions,
           menteeEmail,
           status: 'pending',
       };
       this.sessions.push(newSession);
       return newSession; 
    }

    findOne(id) {
        return this.sessions.find(session => session.id === id);
    }

    findmenteeSession(id) {
        return this.sessions.filter(session => session.menteeid === id);
    }

    findmentorSession(id) {
        return this.sessions.filter(session => session.mentorid === id);
    }

    decline(id) {
        const session = this.sessions.find(sessionobj => sessionobj.id === id);
        const index = this.sessions.indexOf(session);
        this.sessions[index].status = 'rejected';

        return this.sessions[index];
    }

    accept(id) {
        const session = this.sessions.find(sessionobj => sessionobj.id === id);
        const index = this.sessions.indexOf(session);
        this.sessions[index].status = 'accepted';

        return this.sessions[index];
    }

    remove() {
        this.sessions = [];
    }

}

export default new Session();