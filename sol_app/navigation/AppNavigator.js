import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { mayInitWithUrlAsync } from 'expo-web-browser';


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Auth: AuthStackNavigator,
     Main: MainTabNavigator,
  }),
  {
    initialRouteName: 'AuthLoading',
  }
);
