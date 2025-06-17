import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  showSettings = true,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Icon name="arrow-left" size={22} color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {showSettings && navigation ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
          activeOpacity={0.7}
        >
          <Icon name="gear" size={20} color="#2B2D42" iconStyle="solid" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    marginTop: 32,
  },
  title: {
    fontSize: 22,
    color: '#2B2D42',
    fontWeight: '700',
    fontFamily: 'HuninnRegular',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: '#EDF2F4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  iconPlaceholder: {
    width: 36,
  },
});

export default AppHeader;
