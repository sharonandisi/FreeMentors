import userModel from '../models/userModel';
import Session from '../models/Session';

class Session {
    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} session object
      */

    static async createsession(req, res) {
        const menteeid = req.decoded.payload;
        const { mentorid, questions } = req.body;
        const { id: sessionid, status, menteeEmail } = Session.createsession({
            mentorid, questions, menteeid });
        res.status(201).json({
            status: 201,
            message: 'Successful',
            data: {
                sessionid,
                mentorid,
                menteeid,
                questions,
                menteeEmail,
                status,
            },
        });

    }

    static async acceptRequest(req, res){
        const { sessionid } = req.params;

        const { mentorid, menteeid, questions, menteeEmail, status } = Session.accept(sessionid);
        res.status(200).json({
            status: 200,
            message: 'successful',
            data: {
                sessionid,
                mentorid,
                menteeid,
                questions,
                menteeEmail,
                status,
            },
        });
    };

}

export default Session;
