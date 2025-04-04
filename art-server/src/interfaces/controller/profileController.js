const profileUsecase = require('../../application/usecases/profileUsecase');
const getProfileDto = require('../../application/dtos/getProfileDto');
const editProfileDto = require('../../application/dtos/editProfileDto');

const getProfile = async (req, res) => {
    try {
      const dto = new getProfileDto(req.body);
      const result = await profileUsecase.getProfile(dto);
      res.status(200).json(result); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const editProfile = async (req, res) => {
  try {
    const dto = new editProfileDto(req.body);
    const result = await profileUsecase.editProfile(dto);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getProfile, editProfile };