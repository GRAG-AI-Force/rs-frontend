import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { PasswordInput } from '../../../components/inputs/PasswordInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Icon } from '../../../components/common/Icon';
import { useAuth } from '../../../context/AuthContext';
import { theme } from '../../../theme';
import { validatePassword, validateConfirmPassword } from '../../../utils/validation';

export const ResetPasswordScreen = ({ route, navigation }: any) => {
  const { code = '' } = route.params || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const { resetPassword, isLoading } = useAuth();

  const handleResetPassword = async () => {
    setPasswordError('');
    setConfirmError('');
    setGeneralError('');

    const pwdCheck = validatePassword(newPassword);
    if (!pwdCheck.isValid) {
      setPasswordError(pwdCheck.message || 'Weak password.');
      return;
    }

    const confirmCheck = validateConfirmPassword(newPassword, confirmPassword);
    if (!confirmCheck.isValid) {
      setConfirmError(confirmCheck.message || 'Passwords do not match.');
      return;
    }

    const res = await resetPassword(newPassword, code);
    if (res.success) {
      navigation.navigate('Login');
    } else {
      setGeneralError(res.message);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Icon name="lock" size={32} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter a strong new password for your account</Text>
      </View>

      {generalError ? (
        <View style={styles.errorBanner}>
          <Icon name="alert" size={18} color={theme.colors.error} />
          <Text style={styles.errorBannerText}>{generalError}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={setNewPassword}
          error={passwordError}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={confirmError}
        />

        <PrimaryButton
          title="Reset Password & Sign In"
          onPress={handleResetPassword}
          loading={isLoading}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  iconCircle: {
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
    fontSize: 26,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
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
    flex: 1,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
});
