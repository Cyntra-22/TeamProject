class Profile {
    constructor( data ) {
      this._id = data._id;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.birthdate = data.birthdate;
      this.phoneNo = data.phoneNo;
      this.linkedin = data.linkedin;
      this.facebook = data.facebook;
      this.role = data.role;
      this.interests = data.interests;
      this.profileImage = data.profileImage;
    }
  }
  
  module.exports = Profile;
  