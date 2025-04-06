const FollowRepository = require('../../../domain/repositories/followRepository');
const Follow = require('../models/followModel');
const FollowEntity = require('../../../domain/entities/follow');

class FollowRepositoryImpl extends FollowRepository {

  async upsertFollow(followData) {
    const { userId, followerId, recStatus } = followData;
  
    let follow;
  
    if (recStatus === 0) {
      follow = await Follow.findOneAndDelete({ userId, followerId });
  
      if (!follow) {
        throw new Error('Follow record not found');
      }
      return { message: 'Follow relationship deleted successfully' };
    }
  
    follow = await Follow.findOneAndUpdate(
      { userId, followerId },
      {
        recStatus: recStatus !== undefined ? recStatus : 1,  // Default to 1 if not provided
        updatedWhen: Date.now(),
      },
      { new: true, upsert: true }  // Create if not found, update otherwise
    );
  
    return new FollowEntity(follow);
  }
  
  async findFollowersByUserId(id) {
    const followers = await Follow.find({ userId: id, recStatus: { $ne: 0 } });
    if (!followers || followers.length === 0) return null;
    
    return followers
  }

  async findFollowingByUserId(followerId) {
    const following = await Follow.find({ followerId, recStatus: { $ne: 0 } });
    if (!following || following.length === 0) return null;
    
    return following
  }

  async findFollow(followerId, userId) {
    const follow = await Follow.findOne({ 
      followerId, 
      userId, 
      recStatus: { $ne: 0 } 
    });
    
    return follow ? new FollowEntity(follow) : null;
  }
}

module.exports = new FollowRepositoryImpl();