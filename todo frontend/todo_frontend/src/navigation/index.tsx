import React from 'react';
import AuthStackNavigator from './auth-stack-navigator';
import {NavigationContainer} from '@react-navigation/native';
import AppstackNavigator from './app-stack-navigator';
import {Provider, useSelector} from 'react-redux';
import store from '../store';

const Navigation = () => {
  const isAuthenticated = useSelector((state: any) => !!state.user.user); //  useSelector to get the authentication status

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? <AppstackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;
