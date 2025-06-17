import { Platform } from 'react-native';

/**
 * Checks if the current platform is iOS.
 * @returns {boolean} True if the platform is iOS, false otherwise.
 */
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Checks if the current platform is Android.
 * @returns {boolean} True if the platform is Android, false otherwise.
 */
export const isAndroid = (): boolean => Platform.OS === 'android';

/**
 * Returns the current platform OS as a string.
 * @returns {'ios' | 'android' | 'windows' | 'macos' | 'web'} The platform OS.
 */
export const getPlatform = (): typeof Platform.OS => Platform.OS;
