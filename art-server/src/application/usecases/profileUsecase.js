require('dotenv').config();
const userRepo = require('../../infra/databases/repositories/userRepositoryImpl');

const getProfile = async (dto) => {
    const profileEntity = await userRepo.findUserById(dto.id);
    if (!profileEntity) throw new Error('User not found');
  
    const { password: _, ...profileWithoutPassword } = profileEntity;
    return profileWithoutPassword;
  };
  
const editProfile = async (dto) => {
    const updatedProfile = await userRepo.updateUserProfile(dto);
  
    if (!updatedProfile) {
      throw new Error('User not found or update failed');
    }
  
    return updatedProfile;
};

const getArtists = async (dto) => {
  const { limit = 10, page = 1 } = dto;
  const skip = (page - 1) * limit;
  
  const artists = await userRepo.getArtists(limit, skip);
  return artists;
};

module.exports = {getProfile, editProfile, getArtists};