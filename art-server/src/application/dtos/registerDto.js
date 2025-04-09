class RegisterDto {
  constructor(
    { email,
      password,
      confirmPassword,
      firstName,
      lastName,
      birthdate
    }) 
  {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 7 characters long');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (!birthdate) {
      throw new Error('Birthdate is required');
    }

    if (!firstName || !lastName) {
      throw new Error('First and last name are required');
    }

    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
  }
}

module.exports = RegisterDto;
