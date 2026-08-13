import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { Icon } from '../../components/common/Icon';

export const SplashScreen = ({ navigation }: any) => {
  const { user, isLoading, isOnboardingCompleted } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (user) {
          navigation.replace('MainTabs');
        } else if (isOnboardingCompleted) {
          navigation.replace('Auth');
        } else {
          navigation.replace('Onboarding');
        }
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [isLoading, user, isOnboardingCompleted, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Icon name="air" size={48} color={theme.colors.textInverse} />
        </View>
        <Text style={styles.appName}>RESPORE SENCE</Text>
        <Text style={styles.tagline}>Mobile Respiratory & Air Quality Telemetry</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.version}>v1.0.0 (CI Build)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.large,
  },
  appName: {
    ...theme.typography.h1,
    color: theme.colors.text,
    letterSpacing: 2,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  version: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
});
