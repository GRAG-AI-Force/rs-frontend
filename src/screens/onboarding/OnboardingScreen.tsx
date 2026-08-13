import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { OutlineButton } from '../../components/buttons/OutlineButton';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';

interface OnboardingSlide {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    icon: 'air',
    title: 'Precision Air Quality Tracking',
    subtitle: 'Monitor PM2.5, ambient humidity, and allergen index in real time from your mobile device.',
  },
  {
    id: 2,
    icon: 'heartbeat',
    title: 'Continuous Respiratory Biomarkers',
    subtitle: 'Seamlessly link your Respore Sence sensor to stream breathing rate and oxygen saturation (SpO2).',
  },
  {
    id: 3,
    icon: 'shield',
    title: 'Smart Health Alerts & Insights',
    subtitle: 'Receive timely notifications before high pollen or environmental triggers impact your airways.',
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding } = useAuth();

  const handleNext = async () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await completeOnboarding();
      navigation.replace('Auth');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.replace('Auth');
  };

  const slide = SLIDES[currentSlide];

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        {currentSlide > 0 ? (
          <TouchableOpacity onPress={() => setCurrentSlide(currentSlide - 1)}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.slideContainer}>
        <View style={styles.illustrationCircle}>
          <Icon name={slide.icon} size={64} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorRow}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {currentSlide === SLIDES.length - 1 ? (
            <PrimaryButton title="Get Started" onPress={handleNext} style={styles.fullWidthButton} />
          ) : (
            <>
              <OutlineButton title="Skip" onPress={handleSkip} style={styles.halfWidthButton} />
              <PrimaryButton title="Next" onPress={handleNext} style={styles.halfWidthButton} />
            </>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  backText: {
    ...theme.typography.button,
    color: theme.colors.textSecondary,
  },
  skipText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
    ...theme.shadows.medium,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 24,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    marginTop: theme.spacing.xl,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textDisabled,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthButton: {
    flex: 0.48,
  },
  fullWidthButton: {
    width: '100%',
  },
});
