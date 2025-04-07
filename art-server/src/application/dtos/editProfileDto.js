class editProfileDto {
    constructor({ _id, email, firstName, lastName, birthdate, phoneNo, linkedin, facebook, role, interests, profileImage }) {
      if (_id) this._id = _id;
      if (email) this.email = email;
      if (firstName) this.firstName = firstName;
      if (lastName) this.lastName = lastName;
      if (birthdate) this.birthdate = birthdate;
      if (phoneNo) this.phoneNo = phoneNo;
      if (linkedin) this.linkedin = linkedin;
      if (facebook) this.facebook = facebook;
      if (role) this.role = role;
      if (interests) this.interests = interests;
      if (profileImage) this.profileImage = profileImage;
    }
  }
  
  module.exports = editProfileDto;
  