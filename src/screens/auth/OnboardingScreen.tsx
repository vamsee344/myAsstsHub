import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppComponents';
import { Typography, Spacing } from '../../theme';

const { width } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    title: 'Find Your Dream Assets',
    description: 'Explore verified premium properties with virtual tours, locations maps, and instant price estimates.',
    icon: '🏠'
  },
  {
    title: 'CRM Lead Automation',
    description: 'Track leads, schedule property tours, write notes, and close deals directly from your pipeline.',
    icon: '📈'
  },
  {
    title: 'Invite & Earn Rewards',
    description: 'Earn referral cash rewards, level up badges, and unlock elite perks as you invite friends to the platform.',
    icon: '🎁'
  }
];

const OnboardingScreen = ({ navigation }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        <View style={styles.indicatorContainer}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentSlide ? styles.activeIndicator : null
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        {currentSlide < ONBOARDING_SLIDES.length - 1 ? (
          <View style={styles.buttonRow}>
            <AppButton
              title="Skip"
              variant="outline"
              onPress={() => navigation.replace('Login')}
              style={styles.skipBtn}
            />
            <AppButton
              title="Next"
              onPress={handleNext}
              style={styles.nextBtn}
            />
          </View>
        ) : (
          <AppButton
            title="Get Started"
            onPress={handleNext}
            style={{ width: '100%' }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  icon: {
    fontSize: 80,
    marginBottom: Spacing.xl,
  },
  title: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.h1.fontSize,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyLarge.fontSize,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xxl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#1565D8',
    width: 24,
  },
  footer: {
    padding: Spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipBtn: {
    width: '45%',
  },
  nextBtn: {
    width: '45%',
  }
});

export default OnboardingScreen;

