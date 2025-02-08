import { createHash } from 'node:crypto';

export const generateSalt = (length = 16) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
};

export const hashPassword = (password: string, salt: string) => {
  const saltPassword = password + ':' + salt;
  const md5 = createHash('md5');
  return md5.update(saltPassword).digest('hex');
};

export const verifyPassword = (
  password: string,
  salt: string,
  hashVal: string,
) => {
  console.log('password', password);
  console.log('salt', salt);
  console.log('hashVal', hashVal);
  console.log(hashPassword(password, salt), 'hashPassword(password, salt)');
  return hashPassword(password, salt) === hashVal;
};
