import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getScanHistory, ScanHistoryItem } from '../utils/storage';
import { formatDate } from '../utils';

const HistoryList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getScanHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  const renderItem: ListRenderItem<ScanHistoryItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HistoryDetail', { item })}
    >
      <View style={styles.left}>
        <Icon
          name={item.type === 'QR' ? 'qrcode' : 'barcode'}
          size={22}
          color="#EF233C"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.dataText} numberOfLines={1}>
          {item.data.length > 22 ? item.data.slice(0, 22) + '...' : item.data}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.typeText}>
          {item.type ? item.type.toUpperCase() : ''}
        </Text>
        <Text style={styles.timeText}>{formatDate(item.scannedAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, idx) => `${item.data}-${item.scannedAt}-${idx}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text
            style={{ color: '#8D99AE', textAlign: 'center', marginTop: 40 }}
          >
            No scan history found.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 14,
    fontFamily: 'HuninnRegular',
    alignSelf: 'center',
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    minWidth: 180,
    elevation: 2,
    shadowColor: '#2B2D42',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  left: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dataText: {
    fontSize: 14,
    color: '#2B2D42',
    fontFamily: 'HuninnRegular',
    flexShrink: 1,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  typeText: {
    fontSize: 12,
    color: '#EF233C',
    fontWeight: 'bold',
    fontFamily: 'HuninnRegular',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 11,
    color: '#8D99AE',
    fontFamily: 'HuninnRegular',
  },
});

export default HistoryList;
