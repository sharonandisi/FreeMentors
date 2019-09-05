import '../../../config';

const User = {
    user001: {
        firstname: 'sharon',
        lastname: 'andisi',
        email: 'sharonandisi@gmail.com',
        password: 'shay123',
        address: 'nairobi',
        occupation: 'mama',
        bio: 'I am a dev mama',
        expertise: 'motherhood',
    },

    user002: {
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
    },

    user003: {
        firstname: 'shaon',
        lastname: 'andsi',
        email: 'sharonndisi@gmail.com',
        password: 'shay123',
        address: 'nairobi',
        occupation: 'mama',
        bio: 'I am a dev mama',
        expertise: 'motherhood',
    },

    admin: {
        firstname: 'admin',
        lastname: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        address: 'adminville',
        occupation: 'Administrator',
        bio: 'I am admin',
        expertise: 'administration',
    },

    session001: {
        mentorid: 329329,
        questions: 'How to do you create cat videos?'

    },
    session002: {
        questions: 'How to do you create cat videos?'

    },
};

export default User;