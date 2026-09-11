import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import MapEmbed from '../components/MapEmbed';
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';

const CONTACT_MAP_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=144.9728%2C-37.8013%2C144.9828%2C-37.7913&layer=mapnik&marker=-37.7963%2C144.9778';

const INFO_CARDS = [
  { icon: 'receipt-outline' as const, label: 'ABN', value: '12 345 678 901' },
  {
    icon: 'location-outline' as const,
    label: 'Address',
    value: '123 Brunswick St, Fitzroy VIC 3065',
  },
  { icon: 'mail-outline' as const, label: 'Email', value: 'hello@localshelf.com.au' },
  { icon: 'call-outline' as const, label: 'Phone', value: '(03) 9123 4567' },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: 'logo-instagram' as const, url: 'https://www.instagram.com/vusydney/' },
  { name: 'Facebook', icon: 'logo-facebook' as const, url: 'https://www.facebook.com/vusydney.australia/' },
  { name: 'Twitter/X', icon: 'logo-twitter' as const, url: 'https://x.com/victoriauninews' },
];

export default function ContactScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Contact Us" subtitle="We'd love to hear from you" />

        <View style={styles.infoGrid}>
          {INFO_CARDS.map((item) => (
            <View key={item.label} style={styles.infoCard}>
              <View style={styles.infoCardInner}>
                <View style={styles.infoIcon}>
                  <Ionicons name={item.icon} size={18} color={colors.terracotta} />
                </View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Find Us</Text>
        <View style={styles.mapWrapper}>
          <MapEmbed url={CONTACT_MAP_URL} height={200} />
        </View>

        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialRow}>
          {SOCIAL_LINKS.map((social) => (
            <TouchableOpacity
              key={social.name}
              style={styles.socialButton}
              onPress={() => openLink(social.url)}
            >
              <View style={styles.socialIcon}>
                <Ionicons name={social.icon} size={22} color={colors.white} />
              </View>
              <Text style={styles.socialLabel}>{social.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Disclaimer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    paddingHorizontal: spacing.lg - spacing.xs,
    marginTop: spacing.lg,
  },
  infoCard: {
    width: '50%',
    alignSelf: 'stretch',
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.md,
  },
  infoCardInner: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    justifyContent: 'center',
    ...shadow,
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: fonts.body,
    fontWeight: '700',
    color: colors.terracotta,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textDark,
    marginTop: 2,
    lineHeight: 17,
  },
  mapWrapper: {
    marginHorizontal: spacing.lg,
    ...shadow,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: spacing.lg,
  },
  socialButton: {
    alignItems: 'center',
  },
  socialIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  socialLabel: {
    fontSize: 12,
    fontFamily: fonts.body,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: spacing.sm,
  },
});
