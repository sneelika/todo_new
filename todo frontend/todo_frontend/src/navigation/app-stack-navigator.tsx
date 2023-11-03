import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './types';
import BottomTabNavigator from './bottom-tab-navigator';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppstackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppstackNavigator;
