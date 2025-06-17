import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  GestureResponderEvent,
} from 'react-native';

type Variant = 'contained' | 'outlined' | 'text';

interface AppButtonProps {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  icon?: React.ReactNode; // Accepts an icon component (e.g., from react-native-vector-icons)
  iconPosition?: 'left' | 'right';
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'contained',
  style,
  textStyle,
  children,
  icon,
  iconPosition = 'left',
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    let base = [styles.button, styles[variant]];
    if (disabled) base.push(styles.disabled);
    if (style) base.push(style);
    return base;
  };

  const getTextStyle = (): TextStyle[] => {
    let base = [styles.text, styles[`${variant}Text` as const]];
    if (disabled) base.push(styles.disabledText);
    if (textStyle) base.push(textStyle);
    return base;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && <View style={styles.icon}>{icon}</View>}
          {title ? <Text style={getTextStyle()}>{title}</Text> : null}
          {icon && iconPosition === 'right' && <View style={styles.icon}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 4,
  },
  contained: {
    backgroundColor: '#EF233C',
    borderWidth: 0,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#EF233C',
  },
  text: {
    backgroundColor: 'transparent',
  },
  containedText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'HuninnRegular',
    letterSpacing: 1,
  },
  outlinedText: {
    color: '#EF233C',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'HuninnRegular',
    letterSpacing: 1,
  },
  textText: {
    color: '#EF233C',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'HuninnRegular',
    letterSpacing: 1,
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  disabledText: {
    color: '#888',
  },
});

export default AppButton;