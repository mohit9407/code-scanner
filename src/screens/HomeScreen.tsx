import React, {
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import AppButton from '../components/AppButton';
import { saveScanToHistory } from '../utils/storage';
import AppHeader from '../components/AppHeader';

const HomeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannedDataType, setScannedDataType] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const device = useCameraDevice('back');

  // Barcode/QR code scanner callback
  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'ean-13',
      'ean-8',
      'code-128',
      'code-39',
      'code-93',
      'upc-a',
      'upc-e',
      'pdf-417',
      'aztec',
      'data-matrix',
    ],
    onCodeScanned: codes => {
      if (codes.length > 0 && isCameraActive) {
        setIsCameraActive(false); // Pause scanning
        setScannedData(codes[0].value ?? '');
        setScannedDataType(codes[0].type ?? '');
        setShowModal(true); // Show modal with scanned data
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission, requestPermission]);

  const handleStartScan = useCallback(async () => {
    let granted = hasPermission;
    if (!hasPermission) {
      granted = await requestPermission();
    }
    if (!granted) {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to scan codes.',
      );
      return;
    }
    setIsCameraActive(true);
    setScannedData(null);
  }, [hasPermission, requestPermission]);

  if (device == null) {
    return <Text>Camera not available...</Text>;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{ marginRight: 16 }}
        >
          <Icon name="gear" color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <AppHeader title="Home" showSettings={true} />
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#EDF2F4" />
        <View style={styles.header}>
          <Image
            source={require('../assets/images/qr-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>ScannerQRBarcode</Text>
        </View>
        <Text style={styles.subtitle}>
          Welcome! Start scanning QR codes or barcodes using your camera.
        </Text>
        {isCameraActive ? (
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={isCameraActive}
              codeScanner={codeScanner}
            />
          </View>
        ) : (
          <>
            <AppButton
              title={scannedData ? 'Restart Scan' : 'Start Scan'}
              onPress={handleStartScan}
              variant="contained"
              style={styles.scanButton}
            />
            {scannedData && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Last scanned code: {scannedData}
                </Text>
              </View>
            )}
          </>
        )}

        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Scanned!</Text>
              <Text style={styles.modalText}>{scannedData}</Text>
              <View style={styles.modalButtonRow}>
                <AppButton
                  title="OK"
                  onPress={async () => {
                    await saveScanToHistory({
                      data: scannedData ?? '',
                      scannedAt: new Date().toISOString(),
                      type: scannedDataType ?? '',
                    });
                    navigation.navigate('ScanList', { lastScan: scannedData });
                    setShowModal(false);
                  }}
                  variant="contained"
                  style={styles.modalButton}
                  textStyle={styles.modalButtonText}
                />
                <AppButton
                  title="Cancel"
                  onPress={() => {
                    setShowModal(false);
                    setScannedData(null);
                  }}
                  variant="outlined"
                  style={[styles.modalButton, styles.modalButtonOutlined]}
                  textStyle={styles.modalButtonTextOutlined}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Text style={styles.footer}>Powered by YourCompany</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#2B2D42',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontFamily: 'HuninnRegular',
  },
  subtitle: {
    fontSize: 18,
    color: '#8D99AE',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'HuninnRegular',
  },
  scanButton: {
    backgroundColor: '#EF233C',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    marginBottom: 30,
    shadowColor: '#EF233C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cameraContainer: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 40,
    width: '100%',
    shadowColor: '#2B2D42',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  infoText: {
    color: '#2B2D42',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'HuninnRegular',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    color: '#8D99AE',
    fontSize: 14,
    fontFamily: 'HuninnRegular',
    letterSpacing: 1,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 12,
    fontFamily: 'HuninnRegular',
  },
  modalText: {
    fontSize: 16,
    color: '#2B2D42',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'HuninnRegular',
  },

  modalButtonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 12, // If RN < 0.71, remove and use marginLeft on outlined button
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 8,
    marginHorizontal: 0,
    marginRight: 6,
    elevation: 0,
    shadowOpacity: 0,
  },
  modalButtonOutlined: {
    marginRight: 0,
    marginLeft: 6,
    borderWidth: 1.5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'HuninnRegular',
    letterSpacing: 0.5,
    color: '#fff',
  },
  modalButtonTextOutlined: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'HuninnRegular',
    letterSpacing: 0.5,
    color: '#EF233C',
  },
});

export default HomeScreen;
