import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useRoute } from '@react-navigation/native';

const ScanList: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Get last scanned data from navigation state
  const lastScan: string = (route.params as any)?.lastScan || '';

  console.log(
    'ScanList Screen initialized with last scan:',
    lastScan,
    route.params,
  );

  const handleShare = async () => {
    try {
      await Share.share({ message: lastScan });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  const handleCopy = () => {
    // Clipboard.setString(lastScan);
    Alert.alert('Copied', 'Text copied to clipboard');
  };

  const handleOpenInBrowser = () => {
    if (lastScan.startsWith('http')) {
      Linking.openURL(lastScan);
    } else {
      Alert.alert('Invalid URL', 'Scanned data is not a valid URL');
    }
  };

  const handleGoToHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Last Scanned Data:</Text>
      <Text style={styles.data}>{lastScan}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
          <Icon name="share" size={22} color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleCopy}>
          <Icon name="copy" size={22} color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleOpenInBrowser}
        >
          <Icon name="globe" size={22} color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={handleGoToHistory}
        >
          <Text style={styles.historyButtonText}>View Scan History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 18,
    color: '#8D99AE',
    marginBottom: 8,
    fontFamily: 'HuninnRegular',
  },
  data: {
    fontSize: 16,
    color: '#2B2D42',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'HuninnRegular',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 32,
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 16,
    marginHorizontal: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF233C',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginTop: 12,
    elevation: 3,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'HuninnRegular',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ScanList;
