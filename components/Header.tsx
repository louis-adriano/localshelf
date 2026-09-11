import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '../constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAccessory?: ReactNode;
};

export default function Header({ title, subtitle, showBack, rightAccessory }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.titleRow}>
            {showBack && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
                hitSlop={10}
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Ionicons name="chevron-back" size={22} color={colors.cream} />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          {rightAccessory}
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.forest,
  },
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.white,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.terracotta,
    marginTop: 4,
  },
});
