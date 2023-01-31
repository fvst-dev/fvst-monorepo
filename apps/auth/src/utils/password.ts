import bcrypt from 'bcrypt';

const ROUNDS = 10;

export const getPasswordHash = async (password: string) => bcrypt.hash(password, ROUNDS);

export const checkPasswordHash = async (password: string, hash: string) => bcrypt.compare(password, hash);
