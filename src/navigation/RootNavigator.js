import React from 'react';
import AppNavigator from './AppNavigator';
import AuthStack from './AuthStack';

// nanti ini diganti dgn state login dari AsyncStorage / redux / zustand
const isLoggedIn = true;

export default function RootNavigator() {
  return isLoggedIn ? <AppNavigator /> : <AuthStack />;
}
