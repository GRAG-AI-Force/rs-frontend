import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { TextInput } from '../../../components/inputs/TextInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Icon } from '../../../components/common/Icon';
import { authService } from '../../../services/auth/authService';
import { theme } from '../../../theme';
import { validateEmail } from '../../../utils/validation';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setError('');
    if (!emailOrPhone.trim()) {
      setError('Please enter your email or phone number.');
      return;
    }

    if (emailOrPhone.includes('@')) {
      const emailCheck = validateEmail(emailOrPhone);
      if (!emailCheck.isValid) {
        setError(emailCheck.message || 'Invalid email format.');
        return;
      }
    }

    setLoading(true);
    try {
      const res = await authService.requestPasswordReset(emailOrPhone);
      if (res.success) {
        navigation.navigate('OtpVerification', {
          emailOrPhone,
          isPasswordReset: true,
        });
      } else {
        setError(res.message);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevronLeft" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your registered email address or phone number to receive a 6-digit verification code.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email or Phone Number"
          placeholder="sarah.jenkins@resporesence.org"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          autoCapitalize="none"
          error={error}
          leftIcon={<Icon name="mail" size={18} color={theme.colors.textMuted} />}
        />

        <PrimaryButton
          title="Send Verification Code"
          onPress={handleSendOtp}
          loading={loading}
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
    marginBottom: theme.spacing.xxxl,
  },
  backButton: {
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
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
});
