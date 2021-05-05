export const url = 'http://localhost:8080';

export interface BasicUser {
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  birthday: Date | string,
  gender: string,
  type: string,
}

export interface SpecialUser extends BasicUser{
  secretCredential: string
}