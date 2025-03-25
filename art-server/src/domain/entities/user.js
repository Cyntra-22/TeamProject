class User {
  constructor({ email, firstName, lastName, birthdate, _id }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.id = _id;
  }
}

module.exports = User;