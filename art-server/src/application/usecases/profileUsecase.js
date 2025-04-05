require('dotenv').config();
const userRepo = require('../../infra/databases/repositories/userRepositoryImpl');

const getProfile = async (id) => {
    const profileEntity = await userRepo.findUserById(id);
    if (!profileEntity) throw new Error('User not found');
  
    const { password: _, ...profileWithoutPassword } = profileEntity;
    return profileWithoutPassword;
  };
  
const editProfile = async (
    _id, email, firstName, lastName, birthdate,
    phoneNo, linkedin, facebook, role, interests, profileImage
  ) => {
    const updatedProfile = await userRepo.updateUserProfile(
      _id, email, firstName, lastName, birthdate,
      phoneNo, linkedin, facebook, role, interests, profileImage
    );
  
    if (!updatedProfile) {
      throw new Error('User not found or update failed');
    }
  
    return updatedProfile;
  };

module.exports = {getProfile, editProfile};