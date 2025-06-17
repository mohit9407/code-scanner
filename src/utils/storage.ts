import AsyncStorage from '@react-native-async-storage/async-storage';

const SCAN_HISTORY_KEY = 'scanHistory';

export type ScanHistoryItem = {
  data: string;
  scannedAt: string;
  type: string;
};

export const saveScanToHistory = async (
  scan: ScanHistoryItem,
): Promise<void> => {
  try {
    const historyRaw = await AsyncStorage.getItem(SCAN_HISTORY_KEY);
    const history: ScanHistoryItem[] = historyRaw ? JSON.parse(historyRaw) : [];
    history.unshift(scan);
    await AsyncStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving scan to history:', error);
  }
};

export const getScanHistory = async (): Promise<ScanHistoryItem[]> => {
  try {
    const historyRaw = await AsyncStorage.getItem(SCAN_HISTORY_KEY);
    return historyRaw ? (JSON.parse(historyRaw) as ScanHistoryItem[]) : [];
  } catch (error) {
    console.error('Error getting scan history:', error);
    return [];
  }
};

export const clearScanHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SCAN_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing scan history:', error);
  }
};
