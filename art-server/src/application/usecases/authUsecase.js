const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const login = async (email, password) => {
  const userEntity = await userRepo.findUserByEmail(email);
  if (!userEntity) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, userEntity.password);
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

module.exports = { register, login };
