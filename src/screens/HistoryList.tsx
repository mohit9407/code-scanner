import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';

const mockHistory = [
  {
    id: '1',
    data: 'https://github.com/your-repo',
    scannedAt: '2025-06-17 10:30',
    type: 'QR',
  },
  {
    id: '2',
    data: '1234567890123',
    scannedAt: '2025-06-16 18:20',
    type: 'EAN-13',
  },
  {
    id: '3',
    data: 'https://example.com/scan',
    scannedAt: '2025-06-15 14:05',
    type: 'QR',
  },
  {
    id: '4',
    data: 'WIFI:S:MyNetwork;T:WPA;P:mypassword;;',
    scannedAt: '2025-06-14 09:45',
    type: 'QR',
  },
  {
    id: '5',
    data: '9876543210987',
    scannedAt: '2025-06-13 16:10',
    type: 'EAN-13',
  },
  {
    id: '6',
    data: 'mailto:someone@example.com',
    scannedAt: '2025-06-12 11:30',
    type: 'QR',
  },
  {
    id: '7',
    data: 'https://docs.example.com/qr/barcode',
    scannedAt: '2025-06-11 08:22',
    type: 'QR',
  },
  {
    id: '8',
    data: 'CODE128:ABC123XYZ',
    scannedAt: '2025-06-10 19:55',
    type: 'CODE-128',
  },
  {
    id: '9',
    data: 'https://mywebsite.com/product/123',
    scannedAt: '2025-06-09 14:40',
    type: 'QR',
  },
  {
    id: '10',
    data: 'UPC-A:012345678905',
    scannedAt: '2025-06-08 17:05',
    type: 'UPC-A',
  },
];

const HistoryList: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: typeof mockHistory[0] }) => (
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
          iconStyle="solid"
        />
        <Text style={styles.dataText} numberOfLines={1}>
          {item.data.length > 22 ? item.data.slice(0, 22) + '...' : item.data}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text style={styles.timeText}>{item.scannedAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <FlatList
        data={mockHistory}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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