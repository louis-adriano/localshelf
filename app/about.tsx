import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import { colors, fonts, radius, spacing } from '../constants/theme';

const TEAM = [
  {
    name: 'Amy Nguyen',
    role: 'Co-Founder, Market Research',
    initials: 'AN',
    color: '#3E5C76',
  },
  {
    name: 'Louis Adriano',
    role: 'Co-Founder, Tech',
    initials: 'LA',
    color: '#A5462B',
  },
];

const READER_STEPS = [
  {
    title: 'Browse by state',
    body: 'Filter books by your state or search for a title, author, or genre.',
  },
  {
    title: 'Read the details',
    body: 'Check out the description, price, and rating before you buy.',
  },
  {
    title: 'Buy directly',
    body: 'Support the author directly — no middleman, no big publisher cut.',
  },
];

const AUTHOR_STEPS = [
  {
    title: 'List your book',
    body: 'Fill in your title, genre, format, and price in a couple of minutes.',
  },
  {
    title: 'We review it',
    body: "We'll check your listing and get back to you within 48 hours.",
  },
  {
    title: 'Meet local readers',
    body: 'Your book goes live on LocalShelf for readers in your state to find.',
  },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 0) + 40 },
        ]}
      >
        <Header title="About LocalShelf" subtitle="Our story" />

        <View style={styles.missionCard}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.bodyText}>
            LocalShelf exists to connect Australian indie authors with readers
            in their own backyard. Every book on this shelf is written,
            edited, and self-published by someone in your state — we just
            help you find them. No big publishers, no algorithms burying
            local voices, just books from your community, sold on your terms.
          </Text>
        </View>

        <Text style={styles.sectionTitleOutside}>How It Works</Text>

        <View style={styles.stepsCard}>
          <Text style={styles.stepsGroupTitle}>For Readers</Text>
          {READER_STEPS.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepText}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepBody}>{step.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.stepsCard}>
          <Text style={styles.stepsGroupTitle}>For Authors</Text>
          {AUTHOR_STEPS.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepText}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepBody}>{step.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitleOutside}>Meet the Team</Text>
        <View style={styles.teamList}>
          {TEAM.map((member) => (
            <View key={member.name} style={styles.teamCard}>
              <View style={[styles.avatar, { backgroundColor: member.color }]}>
                <Text style={styles.avatarText}>{member.initials}</Text>
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={styles.teamRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.contactBlurb}>
          <Text style={styles.contactBlurbTitle}>Contact Us</Text>
          <Text style={styles.contactBlurbText}>ABN: 12 345 678 901</Text>
          <Text style={styles.contactBlurbText}>
            123 Brunswick St, Fitzroy VIC 3065
          </Text>
          <Text style={styles.contactBlurbText}>hello@localshelf.com.au</Text>
        </View>
      </ScrollView>
      <Disclaimer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: spacing.sm,
  },
  sectionTitleOutside: {
    fontSize: 18,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    lineHeight: 21,
  },
  missionCard: {
    backgroundColor: colors.cream,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepsCard: {
    backgroundColor: colors.cream,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepsGroupTitle: {
    fontSize: 13,
    fontFamily: fonts.body,
    fontWeight: '700',
    color: colors.terracotta,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 12,
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.textDark,
  },
  stepBody: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 18,
  },
  teamList: {
    marginHorizontal: spacing.lg,
    gap: spacing.md,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontWeight: '700',
    fontSize: 16,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.textDark,
  },
  teamRole: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  contactBlurb: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.forest,
  },
  contactBlurbTitle: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.terracotta,
    marginBottom: spacing.xs,
  },
  contactBlurbText: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.cream,
    lineHeight: 19,
  },
});
