import React, { useEffect, useState } from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AppButton from '../components/AppButton';

const SplashScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  console.log('SplashScreen Screen initialized');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation) {
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2B2D42" />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/qr-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ScannerQRBarcode</Text>
      </View>
      <Text style={styles.subtitle}>
        Fast, Secure & Easy QR/Barcode Scanning
      </Text>

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#EF233C"
            style={styles.loader}
          />
        ) : (
          <View style={styles.buttonRow}>
            <AppButton
              onPress={() => {
                navigation.navigate('Home');
              }}
              variant="outlined"
              style={styles.iconButton}
              icon={
                <Icon name="camera" size={22} color="#FFF" iconStyle="solid" />
              }
            />

            <AppButton
              title="Start Scan"
              onPress={() => {
                navigation.navigate('Home');
              }}
              variant="contained"
              style={styles.fullButton}
            />
          </View>
        )}
      </View>

      <Text style={styles.footer}>Powered by YourCompany</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    color: '#EDF2F4',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'HuninnRegular',
  },
  subtitle: {
    fontSize: 18,
    color: '#8D99AE',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'HuninnRegular',
  },
  loader: {
    marginBottom: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    color: '#8D99AE',
    fontSize: 14,
    fontFamily: 'HuninnRegular',
    letterSpacing: 1,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 0,
    marginTop: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12, // If using RN >= 0.71, otherwise use marginRight on
  },
  iconButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 0,
    minWidth: 60,
    backgroundColor: '#EF233C',
  },
  fullButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
  },
});

export default SplashScreen;
