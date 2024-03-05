import { hash, compare } from "bcrypt";

export const encrypt = async (pass) => {
  const passHash = await hash(pass, 5);
  return passHash;
};

export const verified = async (pass, passHash) => {
  const verify = await compare(pass, passHash);
  return verify;
};
