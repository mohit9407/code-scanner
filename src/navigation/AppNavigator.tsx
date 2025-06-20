import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanList from '../screens/ScanList';
import HistoryList from '../screens/HistoryList';
import HistoryDetail from '../screens/HistoryDetail';
import SettingsScreen from '../screens/SettingsScreen';
import AppHeader from '../components/AppHeader';

const Stack = createStackNavigator();

export default function AppNavigator() {
  console.log('AppNavigator initialized');
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScanList" component={ScanList} />
        <Stack.Screen name="History" component={HistoryList} />
        <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
