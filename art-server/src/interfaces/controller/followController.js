const followUsecase = require('../../application/usecases/followUsecase');
const FollowDto = require('../../application/dtos/followDto');

const follow = async (req, res) => {
  try {
    const dto = new FollowDto(req.body);
    const follow = await followUsecase.followUser(dto);
    res.status(201).json(follow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const dto = new FollowDto(req.body);
    const follow = await followUsecase.unfollowUser(dto);
    res.status(200).json(follow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.body;
    const followers = await followUsecase.getFollowers(userId);
    res.status(200).json(followers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.body;
    const following = await followUsecase.getFollowing(userId);
    res.status(200).json(following);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { follow, unfollow, getFollowers, getFollowing };