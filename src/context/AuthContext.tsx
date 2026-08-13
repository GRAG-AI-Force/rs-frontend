import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/user';
import { LoginCredentials, RegisterCredentials } from '../types/auth';
import { AppSettings } from '../types/settings';
import { authService } from '../services/auth/authService';
import { dataService } from '../services/data/dataService';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { DEFAULT_SETTINGS } from '../constants';
import { logger } from '../utils/logger';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isOnboardingCompleted: boolean;
  settings: AppSettings;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  verifyOtp: (code: string, emailOrPhone: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (newPassword: string, code: string) => Promise<{ success: boolean; message: string }>;
  completeOnboarding: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      setIsLoading(true);

      const onboardingState = await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      if (onboardingState === 'true') {
        setIsOnboardingCompleted(true);
      }

      const savedSettings = await storage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (savedSettings) {
        try {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
        } catch (e) {
          logger.warn('Could not parse saved app settings.');
        }
      }

      const savedToken = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const savedUserJson = await storage.getItem(STORAGE_KEYS.USER_SESSION);

      if (savedToken && savedUserJson) {
        const parsedUser: UserProfile = JSON.parse(savedUserJson);
        setToken(savedToken);
        setUser(parsedUser);
        logger.info(`Session restored for user: ${parsedUser.email}`);
      }
    } catch (e) {
      logger.error('Failed to restore user session:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        await storage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(response.user));
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Login failed.' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Login failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.register(credentials);
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        await storage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(response.user));
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Registration failed.' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Registration failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setToken(null);
      await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeItem(STORAGE_KEYS.USER_SESSION);
      logger.info('User logged out successfully.');
    } catch (e) {
      logger.error('Error logging out:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (code: string, emailOrPhone: string) => {
    return authService.verifyOtp(code, emailOrPhone);
  };

  const resetPassword = async (newPassword: string, code: string) => {
    return authService.resetPassword(newPassword, code);
  };

  const completeOnboarding = async () => {
    setIsOnboardingCompleted(true);
    await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return false;
    try {
      const updated = await dataService.updateProfile(updates);
      setUser(updated);
      await storage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(updated));
      return true;
    } catch (e) {
      logger.error('Error updating user profile:', e);
      return false;
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await storage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isOnboardingCompleted,
        settings,
        login,
        register,
        logout,
        verifyOtp,
        resetPassword,
        completeOnboarding,
        updateUserProfile,
        updateSettings,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
