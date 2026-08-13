import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { Avatar } from '../../components/common/Avatar';
import { TextInput } from '../../components/inputs/TextInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SuccessMessage } from '../../components/states/SuccessMessage';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';

export const EditProfileScreen = ({ navigation }: any) => {
  const { user, updateUserProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [medicalCondition, setMedicalCondition] = useState(user?.medicalCondition || '');
  const [emergencyName, setEmergencyName] = useState(user?.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContactPhone || '');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setErrors({});
    setSuccess(false);

    const newErrors: Record<string, string> = {};

    const nameCheck = validateRequired(fullName, 'Full Name');
    if (!nameCheck.isValid) newErrors.fullName = nameCheck.message!;

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) newErrors.email = emailCheck.message!;

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) newErrors.phone = phoneCheck.message!;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const updated = await updateUserProfile({
      fullName,
      email,
      phone,
      bio,
      medicalCondition,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
    });

    setLoading(false);
    if (updated) {
      setSuccess(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    }
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      <AppHeader
        title="Edit Profile"
        showBack
        onBackPress={() => navigation.goBack()}
        style={styles.header}
      />

      <View style={styles.avatarSection}>
        <Avatar name={fullName || 'User'} sourceUrl={user?.avatarUrl} size="large" />
        <Text style={styles.avatarHint}>Respore Sence Health Identity</Text>
      </View>

      {success && <SuccessMessage message="Profile updated successfully!" />}

      <View style={styles.form}>
        <Text style={styles.sectionHeader}>Basic Information</Text>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={errors.phone}
        />
        <TextInput
          label="Short Bio / Specialty"
          value={bio}
          onChangeText={setBio}
          placeholder="e.g. Health Researcher"
        />

        <Text style={styles.sectionHeader}>Respiratory & Emergency Info</Text>
        <TextInput
          label="Medical Condition / Sensitivities"
          value={medicalCondition}
          onChangeText={setMedicalCondition}
          placeholder="e.g. Mild Asthma, Dust Sensitivity"
        />
        <TextInput
          label="Emergency Contact Name"
          value={emergencyName}
          onChangeText={setEmergencyName}
          placeholder="Contact Person"
        />
        <TextInput
          label="Emergency Contact Phone"
          value={emergencyPhone}
          onChangeText={setEmergencyPhone}
          keyboardType="phone-pad"
          placeholder="Emergency Phone Number"
        />

        <PrimaryButton
          title="Save Changes"
          onPress={handleSave}
          loading={loading}
          style={styles.saveButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  avatarHint: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  form: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  sectionHeader: {
    ...theme.typography.title,
    fontSize: 16,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  saveButton: {
    marginTop: theme.spacing.xl,
  },
});
