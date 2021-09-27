export interface ICredenciales {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  email: string;
  nombre: string;
  apellidos: string;
  password: string;
}

export interface IUserResponse extends Omit<IUser, 'password'> {
  id: string;
  token: string;
  admin: boolean;
}
