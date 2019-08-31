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

  /**
  * @returns {object} user object
  */

  createAdmin(data) {

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
      is_Admin: true,
    };
    this.users.push(newUser);
    return newUser;
  }
  /**
   * @param {uuid} id
   * @returns {object} user object
   */

  findOne(id) {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  changeMentor(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index].mentorstatus = 'mentor';
    return this.users[index];
  }

  findMentor() {
    return this.users.filter((user) => user.mentorstatus === 'true');
  }

  remove() {
    this.users = [];
  }

  findAdmin() {
    return this.users.find((user) => user.is_Admin === 'true');
  }
}
export default new User();
