const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userRepo = require('../../infra/databases/repositories/userRepositoryImpl');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (dto) => {
  const existingUser = await userRepo.findUserByEmail(dto.email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const userEntity = await userRepo.createUser({
    email: dto.email,
    password: hashedPassword,
    firstName: dto.firstName,
    lastName: dto.lastName,
    birthdate: dto.birthdate,
  });

  const { password, ...userWithoutPassword } = userEntity;
  return userWithoutPassword;
};

const login = async (dto) => {
  const userEntity = await userRepo.findUserByEmail(dto.email);
  if (!userEntity) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(dto.password, userEntity.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: userEntity.id, email: userEntity.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  const { password: _, ...userWithoutPassword } = userEntity;
  return {
    user: userWithoutPassword, 
    token,
  };
};

const getIDfromToken = (dto) => {
  try {
    const decoded = jwt.verify(dto.token, JWT_SECRET);
    
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { register, login, getIDfromToken };

