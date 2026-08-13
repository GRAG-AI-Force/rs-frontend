import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { TextInput } from '../../../components/inputs/TextInput';
import { PasswordInput } from '../../../components/inputs/PasswordInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Icon } from '../../../components/common/Icon';
import { useAuth } from '../../../context/AuthContext';
import { theme } from '../../../theme';
import { validateEmail } from '../../../utils/validation';

export const LoginScreen = ({ navigation }: any) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let hasErr = false;

    if (!emailOrPhone.trim()) {
      setEmailError('Email or Username is required.');
      hasErr = true;
    } else if (emailOrPhone.includes('@')) {
      const emailValidation = validateEmail(emailOrPhone);
      if (!emailValidation.isValid) {
        setEmailError(emailValidation.message || 'Invalid email.');
        hasErr = true;
      }
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasErr = true;
    }

    if (hasErr) return;

    const res = await login({ emailOrPhone, password });
    if (!res.success) {
      setGeneralError(res.message);
    }
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Icon name="air" size={32} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your Respore Sence telemetry account</Text>
      </View>

      {generalError ? (
        <View style={styles.errorBanner}>
          <Icon name="alert" size={18} color={theme.colors.error} />
          <Text style={styles.errorBannerText}>{generalError}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <TextInput
          label="Email or Phone Number"
          placeholder="sarah.jenkins@resporesence.org"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          autoCapitalize="none"
          keyboardType="email-address"
          error={emailError}
          leftIcon={<Icon name="mail" size={18} color={theme.colors.textMuted} />}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.loginButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: theme.spacing.xxs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.errorBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  errorBannerText: {
    ...theme.typography.captionMedium,
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  form: {
    marginBottom: theme.spacing.xxxl,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginVertical: theme.spacing.md,
  },
  forgotText: {
    ...theme.typography.captionMedium,
    color: theme.colors.primary,
  },
  loginButton: {
    marginTop: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  footerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  registerText: {
    ...theme.typography.bodyBold,
    color: theme.colors.primary,
  },
});
