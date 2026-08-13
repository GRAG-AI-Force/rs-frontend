import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { TextInput } from '../../../components/inputs/TextInput';
import { PasswordInput } from '../../../components/inputs/PasswordInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Icon } from '../../../components/common/Icon';
import { useAuth } from '../../../context/AuthContext';
import { theme } from '../../../theme';
import { validateEmail, validatePhone, validatePassword, validateConfirmPassword } from '../../../utils/validation';

export const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    setErrors({});
    setGeneralError('');

    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) newErrors.email = emailCheck.message || 'Invalid email.';

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) newErrors.phone = phoneCheck.message || 'Invalid phone.';

    const pwdCheck = validatePassword(password);
    if (!pwdCheck.isValid) newErrors.password = pwdCheck.message || 'Weak password.';

    const confirmCheck = validateConfirmPassword(password, confirmPassword);
    if (!confirmCheck.isValid) newErrors.confirmPassword = confirmCheck.message || 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await register({ fullName, email, phone, password, confirmPassword });
    if (res.success) {
      navigation.navigate('OtpVerification', { emailOrPhone: email, isPasswordReset: false });
    } else {
      setGeneralError(res.message);
    }
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevronLeft" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Respore Sence mobile health telemetry network</Text>
      </View>

      {generalError ? (
        <View style={styles.errorBanner}>
          <Icon name="alert" size={18} color={theme.colors.error} />
          <Text style={styles.errorBannerText}>{generalError}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <TextInput
          label="Full Name"
          placeholder="Dr. Sarah Jenkins"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          leftIcon={<Icon name="user" size={18} color={theme.colors.textMuted} />}
        />

        <TextInput
          label="Email Address"
          placeholder="sarah@resporesence.org"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
          leftIcon={<Icon name="mail" size={18} color={theme.colors.textMuted} />}
        />

        <TextInput
          label="Phone Number"
          placeholder="+1 (555) 234-5678"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={errors.phone}
          leftIcon={<Icon name="phone" size={18} color={theme.colors.textMuted} />}
        />

        <PasswordInput
          label="Password"
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
        />

        <PrimaryButton
          title="Create Respore Account"
          onPress={handleRegister}
          loading={isLoading}
          style={styles.registerButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 26,
    color: theme.colors.text,
    marginBottom: theme.spacing.xxs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
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
    marginBottom: theme.spacing.xl,
  },
  registerButton: {
    marginTop: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  footerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  loginText: {
    ...theme.typography.bodyBold,
    color: theme.colors.primary,
  },
});
