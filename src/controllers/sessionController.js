import userModel from '../models/userModel';
import sessionModel from '../models/sessionModel';

class Session {
    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} session object
      */

    static async createsession(req, res) {
        const menteeid = req.decoded;
        const { mentorid, questions } = req.body;
        const { id: sessionid, status, menteeEmail } = sessionModel.create({
            mentorid, questions, menteeid });
        return res.status(201).json({
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
        if(sessionModel.findOne(sessionid).status === 'accepted'){
            return res.status(409).json({
                status: 409,
                error: 'conflict. Session already accepted'
            })
        }
        const { mentorid, menteeid, questions, menteeEmail, status } = sessionModel.accept(sessionid);
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

    static async declineRequest(req,res){
        const { sessionid } = req.params;
        if (sessionModel.findOne(sessionid).status === 'rejected') {
            return res.status(409).json({
                status: 409,
                error: 'conflict. Session already rejected'
            })
        }
        const { mentorid, menteeid, questions, menteeEmail, status} = sessionModel.decline(sessionid);
        res.status(200).json({
            status: 200,
            message: 'successful',
            data: {
                sessionid,
                menteeid,
                mentorid,
                questions,
                menteeEmail,
                status,
            }
        })
    }

}

export default Session;
