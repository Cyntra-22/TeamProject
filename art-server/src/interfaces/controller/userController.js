const authUsecase = require('../../application/usecases/authUsecase');
const getProfileDto = require('../../application/dtos/getProfileDto');

const getProfile = async (req, res) => {
    try {
      const dto = new getProfileDto(req.body);
      const result = await authUsecase.getProfile(dto.id);
      res.status(200).json(result); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports = { getProfile };