export const url = 'http://localhost:8080';

export interface LoginUser{
  username: string,
  password: string,
} 

export interface BasicUser extends LoginUser {
  firstname: string,
  lastname: string,
  birthday: Date | string,
  gender: string,
  type: string,
}

export interface SpecialUser extends BasicUser{
  secretCredential: string
}

export interface User extends BasicUser{
  id: string,
  doctorId?: string,
  caregiverId?: string,
  address?: string,
}