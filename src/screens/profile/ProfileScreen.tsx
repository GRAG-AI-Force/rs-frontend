import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { Avatar } from '../../components/common/Avatar';
import { Card } from '../../components/common/Card';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { ProfileItem } from '../../components/cards/ProfileItem';
import { ConfirmationModal } from '../../components/modals/ConfirmationModal';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogoutConfirm = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    setLogoutModalVisible(false);
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <Card style={styles.userCard}>
          <View style={styles.avatarRow}>
            <Avatar name={user?.fullName || 'User'} sourceUrl={user?.avatarUrl} size="large" />
            <View style={styles.userDetails}>
              <Text style={styles.name}>{user?.fullName || 'Dr. Sarah Jenkins'}</Text>
              <Text style={styles.email}>{user?.email || 'sarah@resporesence.org'}</Text>
              <Text style={styles.phone}>{user?.phone || '+1 (555) 234-5678'}</Text>

              {user?.medicalCondition && (
                <View style={styles.conditionTag}>
                  <Icon name="heartbeat" size={12} color={theme.colors.primary} style={styles.tagIcon} />
                  <Text style={styles.conditionText}>{user.medicalCondition}</Text>
                </View>
              )}
            </View>
          </View>

          <PrimaryButton
            title="Edit Profile Information"
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editButton}
          />
        </Card>

        {/* Hardware Status Card */}
        <Text style={styles.sectionHeader}>Hardware Telemetry</Text>
        <Card style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <View style={styles.deviceTitleRow}>
              <Icon name="battery" size={20} color={theme.colors.success} />
              <Text style={styles.deviceName}>
                {user?.deviceName || 'Respore Sence Pulse Pro v2'}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Connected</Text>
            </View>
          </View>
          <Text style={styles.batteryText}>Battery: {user?.deviceBattery || 88}% • Firmware v2.4.1</Text>
        </Card>

        {/* Options List */}
        <Text style={styles.sectionHeader}>Account & Preferences</Text>
        <View style={styles.menuContainer}>
          <ProfileItem
            iconName="user"
            title="Personal Details & Medical History"
            subtitle="Manage respiratory health parameters"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <ProfileItem
            iconName="settings"
            title="Application Settings"
            subtitle="Notifications, Sync & Privacy preferences"
            onPress={() => navigation.navigate('Settings')}
          />
          <ProfileItem
            iconName="phone"
            title="Emergency Contact Setup"
            subtitle={user?.emergencyContactName ? `${user.emergencyContactName} (${user.emergencyContactPhone})` : 'Not configured'}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <ProfileItem
            iconName="shield"
            title="Data & Privacy Policy"
            subtitle="Encrypted medical telemetry protocols"
            onPress={() =>
              navigation.navigate('Details', {
                itemId: 'privacy_policy',
                title: 'Data & Privacy Policy',
                category: 'guides',
              })
            }
          />
          <ProfileItem
            iconName="logout"
            title="Log Out of Account"
            subtitle="Safely clear session credentials from device"
            onPress={() => setLogoutModalVisible(true)}
            destructive
          />
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={logoutModalVisible}
        title="Log Out of Respore Sence?"
        message="Are you sure you want to log out? Your local telemetry session will be ended."
        confirmText="Log Out"
        cancelText="Cancel"
        destructive
        loading={loggingOut}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  userCard: {
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  userDetails: {
    flex: 1,
    marginLeft: theme.spacing.lg,
  },
  name: {
    ...theme.typography.h3,
    fontSize: 20,
    color: theme.colors.text,
  },
  email: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  phone: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  conditionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.xs,
  },
  tagIcon: {
    marginRight: 4,
  },
  conditionText: {
    ...theme.typography.small,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  editButton: {
    marginTop: theme.spacing.xs,
  },
  sectionHeader: {
    ...theme.typography.title,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  deviceCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceName: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  statusBadge: {
    backgroundColor: theme.colors.successBackground,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    ...theme.typography.small,
    color: theme.colors.success,
    fontWeight: '600',
  },
  batteryText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  menuContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xxxl,
  },
});
