const authUsecase = require('../../application/usecases/authUsecase');
const RegisterDto = require('../../application/dtos/registerDto');
const LoginDto = require('../../application/dtos/loginDto');

const register = async (req, res) => {
  try {
    const dto = new RegisterDto(req.body);
    const user = await authUsecase.register(dto);
    res.status(201).json(user); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const dto = new LoginDto(req.body);
    const result = await authUsecase.login(dto);
    res.status(200).json(result); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const IDfromToken = async (req, res) => {
  try {
    const result = await authUsecase.getIDfromToken(req.body);
    res.status(200).json(result); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, IDfromToken};
