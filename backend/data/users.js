import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@shopee.com',
    password: bcrypt.hashSync('mon@nim', 10),
    isAdmin: true,
  }
]

export default users;