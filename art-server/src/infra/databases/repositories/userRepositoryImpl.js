const User = require('../models/userModel');
const UserRepository = require('../../../domain/repositories/userRepository');
const UserEntity = require('../../../domain/entities/user'); 
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
}

module.exports = new UserRepositoryImpl();
