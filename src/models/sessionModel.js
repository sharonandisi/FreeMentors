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

    
}