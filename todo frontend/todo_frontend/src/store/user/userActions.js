import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN_USER, LOGOUT_USER} from './userActionTypes';
import {TOKEN_IDENTIFIER} from '../../services/config';

export const logiin = user => {
  return async dispatch => {
    await saveUserData(user);

    const getUserDataa = await getUserData();
    console.log('Get user data ', getUserDataa);

    dispatch({type: LOGIN_USER, payload: user});
  };
};

export const logout = () => {
  return async dispatch => {
    await deleteData();
    dispatch({type: LOGOUT_USER});
  };
};

const saveUserData = async user => {
  await AsyncStorage.setItem(
    TOKEN_IDENTIFIER,
    JSON.stringify({TOKEN_IDENTIFIER: user}),
  );
};

export const getUserData = async () => {
  const userData = await AsyncStorage.getItem(TOKEN_IDENTIFIER);
  return JSON.parse(userData);
};

const deleteData = async () => {
  await AsyncStorage.removeItem(TOKEN_IDENTIFIER);
};
