class Profile {
    constructor( _id, email, firstName, lastName, birthdate, phoneNo,linkedin, facebook, role, interests , profileImage) {
      this.id = _id;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthdate = birthdate;
      this.phoneNo = phoneNo;
      this.linkedin = linkedin;
      this.facebook = facebook;
      this.role = role;
      this.interests = interests;
      this.profileImage = profileImage;
    }
  }
  
  module.exports = Profile;
  