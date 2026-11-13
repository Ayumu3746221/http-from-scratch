import { InvalidRequestError } from "../errors/application";

export const Hello = (username: string): string => {
  const reg = /^[a-zA-Z]*$/;

  if (!reg.test(username)) {
    throw new InvalidRequestError(reg.toString(), username);
  }

  return `Hello ${username}!!`;
};
