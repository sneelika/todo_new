import {IUser} from '../types';
import axiosInstance from './config';
type RegisterUserTypes = IUser;

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserTypes) => {
  try {
    console.log('It came to the Register User API');
    const response = await axiosInstance.post('/users/create', {
      name: name,
      email: email,
      password: password,
    });
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    console.log('error in registerUser', error);
    throw error;
  }
};

type LoginUserTypes = Omit<IUser, 'name'>;

export const loginUser = async ({email, password}: LoginUserTypes) => {
  try {
    console.log('It came to the Login User API');

    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });

    console.log('It came here also');

    const _token = response.data.token;
    axiosInstance.defaults.headers.common['Authorization'] = _token;
    console.log('_token');
    return response.data.user;
  } catch (error) {
    console.log('error in loginUser', error);
    throw error;
  }
};

export const logoutUser = async () => {
  console.log('It came to the LoginoutUser User API');
  return await axiosInstance.get('/users/logout');
};
