import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { OTPInput } from '../../../components/inputs/OTPInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Icon } from '../../../components/common/Icon';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/auth/authService';
import { theme } from '../../../theme';
import { validateOtp } from '../../../utils/validation';

export const OtpVerificationScreen = ({ route, navigation }: any) => {
  const { emailOrPhone = 'your contact', isPasswordReset = false } = route.params || {};

  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  const { verifyOtp } = useAuth();

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerify = async () => {
    setError('');
    const validation = validateOtp(otpCode, 6);
    if (!validation.isValid) {
      setError(validation.message || 'Invalid code.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(otpCode, emailOrPhone);
      if (res.success) {
        if (isPasswordReset) {
          navigation.navigate('ResetPassword', { code: otpCode });
        } else {
          navigation.replace('MainTabs');
        }
      } else {
        setError(res.message);
      }
    } catch (e: any) {
      setError(e.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setResendTimer(45);
    setError('');
    await authService.requestPasswordReset(emailOrPhone);
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevronLeft" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit verification code to <Text style={styles.highlight}>{emailOrPhone}</Text>
        </Text>
      </View>

      <View style={styles.body}>
        <OTPInput
          length={6}
          onCodeChanged={setOtpCode}
          onCodeFilled={handleVerify}
          error={error}
        />

        <PrimaryButton
          title="Verify OTP"
          onPress={handleVerify}
          loading={loading}
          style={styles.button}
        />

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn&apos;t receive the code? </Text>
          {resendTimer > 0 ? (
            <Text style={styles.timerText}>Resend in {resendTimer}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendActiveText}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xxl,
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
  highlight: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  body: {
    flex: 1,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  resendText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  timerText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textMuted,
  },
  resendActiveText: {
    ...theme.typography.bodyBold,
    color: theme.colors.primary,
  },
});
