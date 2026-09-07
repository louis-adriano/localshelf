import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '../constants/theme';

export default function HomeHeader() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>LocalShelf</Text>
        <Text style={styles.tagline}>Indie books, straight from the source</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cream,
  },
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
  },
});
