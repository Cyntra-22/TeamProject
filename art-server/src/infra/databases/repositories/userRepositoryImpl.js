const User = require('../models/userModel');
const UserRepository = require('../../../domain/repositories/userRepository');
const UserEntity = require('../../../domain/entities/user');
const ProfileEntity = require('../../../domain/entities/profile');

class UserRepositoryImpl extends UserRepository {
  async findUserByEmail(email) {
    const userData = await User.findOne({ email });
    if (!userData) return null;
    
    return new UserEntity(userData);  
  }

  async createUser(data) {
    const userData = new User(data);
    const savedUser = await userData.save();
    
    return new UserEntity(savedUser); 
  }

  async findUserById(_id){
    const userData = await User.findOne({ _id });
    if (!userData) return null;

    return new ProfileEntity(userData);  
  }

  async findUserByIdwithPassword(_id){
    const userData = await User.findOne({ _id });
    if (!userData) return null;

    return new UserEntity(userData);  
  }

  async updateUserProfile(data) {
    const { _id, ...updateFields } = data;
  
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });
  
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedUser) return null;
  
    return new ProfileEntity(updatedUser);
  }
  
  async changePassword(data) {
    const { userId, newPassword } = data;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          password: newPassword,
          updatedWhen: Date.now()
        } 
      },
      { new: true }
    );
    
    if (!updatedUser) return null;
    
    return new UserEntity(updatedUser);
  }

  async getArtists(limit = 10, skip = 0) {
    const artistUsers = await User.find({ role: 'artist' })
      .select('_id firstName lastName profileImage')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    
    if (!artistUsers || artistUsers.length === 0) {
      return [];
    }
    
    return artistUsers.map(artist => {
      return {
        _id: artist._id,
        firstName: artist.firstName,
        lastName: artist.lastName,
        profileImage: artist.profileImage
      };
    });
  }

}

module.exports = new UserRepositoryImpl();
