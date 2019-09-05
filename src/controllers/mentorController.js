import UserModel from '../models/userModel';

class Mentor {

    static async fetchAllMentors(req, res) {
        const mentor = UserModel.findMentor();
        const mentors = mentor.map(({ id: mentorid, firstname, lastname, email, address, occupation, bio, expertise, mentorstatus, isAdmin, }) => ({
            mentorid, firstname, lastname, email, address, occupation, bio, expertise, mentorstatus, isAdmin,
        }));

        if (mentors.length) {
            return res.status(200).json({
                status: 200,
                data: mentors,
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'No mentors have been found'
        });
    }

    static async fetchSpecificMentor(req, res) {
        const { mentorid } = req.params;
        console.log(mentorid);
        const user = UserModel.findOne(mentorid);
        if (user && user.mentorstatus) {
            const {
                id: mentorid, firstname, lastname, email, address, occupation, bio, expertise, mentorstatus, isAdmin
            } = user;
            return res.status(200).json({
                status: 200,
                message: 'success',
                data: {
                    mentorid,
                    firstname,
                    lastname,
                    email,
                    address,
                    occupation,
                    bio,
                    expertise,
                    mentorstatus,
                    isAdmin
                }
            });
        }
    }
}

export default Mentor;
