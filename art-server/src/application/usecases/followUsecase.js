const followRepo = require('../../infra/databases/repositories/followRepositoryImpl');
const userRepo = require('../../infra/databases/repositories/userRepositoryImpl');

const followUser = async (dto) => {
    const user = await userRepo.findUserById(dto.userId);
    const follower = await userRepo.findUserById(dto.followerId);
    
    const existingFollow = await followRepo.findFollow(
        dto.followerId, 
        dto.userId
      );
      
      if (existingFollow) {
        throw new Error('You are already following this user');
      }

    if (!user) throw new Error('User to follow does not exist');
    if (!follower) throw new Error('Follower does not exist');
    
    if (dto.userId === dto.followerId) {
      throw new Error('Users cannot follow themselves');
    }
    const followData = {
        userId: dto.userId,
        followerId: dto.followerId,
        recStatus: 1 
      };

    const updatedFollow = await followRepo.upsertFollow(followData);
    return updatedFollow
  };

const unfollowUser = async (dto) => {
    const existingFollow = await followRepo.findFollow(dto.followerId, dto.userId);
  
    if (!existingFollow) {
      throw new Error('You are not following this user');
    }
  
    const unfollowData = {
      userId: existingFollow.userId,    // Include this required field
      followerId: existingFollow.followerId,  // Include this required field
      recStatus: 0  // Set to 0 to mark as inactive or delete
    };
  
    return await followRepo.upsertFollow(unfollowData);
  };
  

const getFollowers = async (id) => {
    const followers = await followRepo.findFollowersByUserId(id);
    
    if (!followers) return [];
    
    return followers.map(follow => ({
        followerId: follow.followerId,
    }));
    };
    
const getFollowing = async (followerId) => {
    const following = await followRepo.findFollowingByUserId(followerId);
    
    if (!following) return [];
    
    return following.map(follow => ({
        userId: follow.userId,
    }));
    };

module.exports = {followUser, unfollowUser, getFollowers, getFollowing};