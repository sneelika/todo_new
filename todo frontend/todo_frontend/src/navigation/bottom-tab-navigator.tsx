import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from './types';
import React from 'react';
import HomeStackNavigator from './home-stack-navigator';
import CompletedScreen from '../screens/completed-screen';
import TodayScreen from '../screens/today-screen';
import CategoriesStackNavigator from './categories-stack-navigator';
import Icons from '../components/shared/icons';
import theme from '../utils/theme';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: theme.colors.gray500,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: 'Home',
          tabBarIcon: ({color}) => <Icons name="home" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: 'Completed',
          tabBarIcon: ({color}) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={() => ({
          title: 'Today',
          tabBarIcon: ({color}) => <Icons name="calendar" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: 'Categories',
          tabBarIcon: ({color}) => <Icons name="categories" color={color} />,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
