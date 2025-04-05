class User {
  constructor({ email, password, firstName, lastName, birthdate, _id }) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.id = _id;
  }
}

module.exports = User;