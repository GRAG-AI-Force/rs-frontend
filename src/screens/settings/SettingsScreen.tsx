import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { Card } from '../../components/common/Card';
import { ConfirmationModal } from '../../components/modals/ConfirmationModal';
import { SuccessMessage } from '../../components/states/SuccessMessage';
import { useAuth } from '../../context/AuthContext';
import { APP_INFO } from '../../constants';
import { storage } from '../../utils/storage';
import { theme } from '../../theme';

export const SettingsScreen = ({ navigation }: any) => {
  const { settings, updateSettings, logout } = useAuth();
  const [clearedMessage, setClearedMessage] = useState('');
  const [clearModalVisible, setClearModalVisible] = useState(false);

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    updateSettings({ [key]: value });
  };

  const handleClearCache = async () => {
    await storage.clear();
    setClearModalVisible(false);
    setClearedMessage('Local cache & settings cleared successfully.');
    setTimeout(() => {
      logout();
    }, 1500);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      <AppHeader
        title="Settings"
        showBack
        onBackPress={() => navigation.goBack()}
        style={styles.header}
      />

      {clearedMessage ? <SuccessMessage message={clearedMessage} /> : null}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Notification Settings */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Card style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSubtitle}>Air quality and SpO2 biomarker alerts</Text>
            </View>
            <Switch
              value={settings.pushNotifications}
              onValueChange={v => handleToggle('pushNotifications', v)}
              trackColor={{ false: theme.colors.borderDark, true: theme.colors.primaryLight }}
              thumbColor={settings.pushNotifications ? theme.colors.primary : theme.colors.border}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingTitle}>Emergency SMS Triggers</Text>
              <Text style={styles.settingSubtitle}>Send SMS to emergency contacts on critical SpO2 drops</Text>
            </View>
            <Switch
              value={settings.emergencyAlertsEnabled}
              onValueChange={v => handleToggle('emergencyAlertsEnabled', v)}
              trackColor={{ false: theme.colors.borderDark, true: theme.colors.primaryLight }}
              thumbColor={settings.emergencyAlertsEnabled ? theme.colors.primary : theme.colors.border}
            />
          </View>
        </Card>

        {/* Sync & Biometric Settings */}
        <Text style={styles.sectionTitle}>Device & Security</Text>
        <Card style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingTitle}>Automatic Sensor Sync</Text>
              <Text style={styles.settingSubtitle}>Sync background telemetry every 15 minutes</Text>
            </View>
            <Switch
              value={settings.autoSync}
              onValueChange={v => handleToggle('autoSync', v)}
              trackColor={{ false: theme.colors.borderDark, true: theme.colors.primaryLight }}
              thumbColor={settings.autoSync ? theme.colors.primary : theme.colors.border}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingTitle}>Biometric Lock</Text>
              <Text style={styles.settingSubtitle}>Use FaceID / Fingerprint to open app</Text>
            </View>
            <Switch
              value={settings.biometricLogin}
              onValueChange={v => handleToggle('biometricLogin', v)}
              trackColor={{ false: theme.colors.borderDark, true: theme.colors.primaryLight }}
              thumbColor={settings.biometricLogin ? theme.colors.primary : theme.colors.border}
            />
          </View>
        </Card>

        {/* System Information */}
        <Text style={styles.sectionTitle}>About Application</Text>
        <Card style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Application Name</Text>
            <Text style={styles.infoValue}>{APP_INFO.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>{APP_INFO.version} (Build {APP_INFO.buildNumber})</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CI/CD Status</Text>
            <Text style={styles.infoValue}>Jenkins Verified</Text>
          </View>
        </Card>
      </ScrollView>

      <ConfirmationModal
        visible={clearModalVisible}
        title="Clear Local Cache?"
        message="This will wipe cached telemetry data and reset settings. You will be logged out."
        confirmText="Clear Cache"
        destructive
        onConfirm={handleClearCache}
        onCancel={() => setClearModalVisible(false)}
      />
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
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  sectionTitle: {
    ...theme.typography.title,
    fontSize: 16,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  card: {
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  settingTextGroup: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  settingTitle: {
    ...theme.typography.bodyBold,
    fontSize: 15,
    color: theme.colors.text,
  },
  settingSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  infoLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
});
