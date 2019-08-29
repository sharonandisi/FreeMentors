import uuid from 'uuid';

class User {
  /**
     * class constructor
     * @param {object} data
     */

  constructor() {
    this.users = [];
  }

  /**
   * @returns {object} user object
   */

  create(data) {
    const newUser = {
      id: uuid.v4(),
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      email: data.email || '',
      password: data.password || '',
      address: data.address || '',
      bio: data.bio || '',
      occupation: data.occupation || '',
      expertise: data.expertise || '',
      mentorstatus: false,
      is_Admin: false,
    };
    this.users.push(newUser);
    return newUser;
  }
}
export default new User();
