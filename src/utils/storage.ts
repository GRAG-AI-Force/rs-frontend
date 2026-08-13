import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from './logger';

const MEMORY_STORAGE: Record<string, string> = {};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@respore_auth_token',
  USER_SESSION: '@respore_user_session',
  ONBOARDING_COMPLETED: '@respore_onboarding_completed',
  APP_SETTINGS: '@respore_app_settings',
};

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (AsyncStorage && typeof AsyncStorage.getItem === 'function') {
        const val = await AsyncStorage.getItem(key);
        if (val !== null) return val;
      }
      return MEMORY_STORAGE[key] ?? null;
    } catch (e) {
      logger.error(`Error reading key ${key} from storage:`, e);
      return MEMORY_STORAGE[key] ?? null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      MEMORY_STORAGE[key] = value;
      if (AsyncStorage && typeof AsyncStorage.setItem === 'function') {
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
      logger.error(`Error setting key ${key} in storage:`, e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      delete MEMORY_STORAGE[key];
      if (AsyncStorage && typeof AsyncStorage.removeItem === 'function') {
        await AsyncStorage.removeItem(key);
      }
    } catch (e) {
      logger.error(`Error removing key ${key} from storage:`, e);
    }
  },

  async clear(): Promise<void> {
    try {
      Object.keys(MEMORY_STORAGE).forEach(k => delete MEMORY_STORAGE[k]);
      if (AsyncStorage && typeof AsyncStorage.clear === 'function') {
        await AsyncStorage.clear();
      }
    } catch (e) {
      logger.error('Error clearing storage:', e);
    }
  },
};
