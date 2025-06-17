/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View, Text } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

function App() {
  const isDarkMode = false;
  console.log('App initialized isDarkMode:', isDarkMode);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* Add top padding to avoid front camera notch */}
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'HuninnRegular',
  },
  container: {
    flex: 1,
  },
  safeAreaSpacer: {
    height: 60, // Adjust this value as needed for your device
  },
});

export default App;
