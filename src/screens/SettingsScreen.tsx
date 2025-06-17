// SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import AppHeader from '../components/AppHeader';

const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <>
    <AppHeader title="Setting" showSettings={false} />
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={22} color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      {/* Add your settings options here */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        {/* Example setting */}
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Clear Scan History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.settingText}>App version 1.0.0</Text>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDF2F4', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButton: { marginRight: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2B2D42' },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 16,
    color: '#8D99AE',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  settingItem: { paddingVertical: 12 },
  settingText: { fontSize: 16, color: '#2B2D42' },
});

export default SettingsScreen;
