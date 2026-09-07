import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BookCard from '../components/BookCard';
import BookListRow from '../components/BookListRow';
import Disclaimer from '../components/Disclaimer';
import HomeHeader from '../components/HomeHeader';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { Book } from '../data/books';
import { fetchFeaturedBooks, fetchNewArrivals } from '../lib/books';

export default function HomeScreen() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchFeaturedBooks(3), fetchNewArrivals(3)])
      .then(([featured, arrivals]) => {
        if (!cancelled) {
          setFeaturedBooks(featured);
          setNewArrivals(arrivals);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load books.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HomeHeader />

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Discover Australian indie authors near you
          </Text>
          <Text style={styles.heroSubtitle}>
            Browse, buy, and support self-published books from local writers
            across the country.
          </Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push('/browse')}
          >
            <Text style={styles.heroButtonText}>Browse Books</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator
            color={colors.forest}
            size="large"
            style={styles.loadingIndicator}
          />
        ) : error ? (
          <Text style={styles.emptyText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Featured</Text>
            {featuredBooks.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredRow}
              >
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} style={styles.featuredCard} />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.emptyText}>No featured books yet.</Text>
            )}

            <Text style={styles.sectionTitle}>New Arrivals</Text>
            {newArrivals.length > 0 ? (
              newArrivals.map((book) => <BookListRow key={book.id} book={book} />)
            ) : (
              <Text style={styles.emptyText}>No new arrivals yet.</Text>
            )}
          </>
        )}
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
  hero: {
    backgroundColor: colors.forest,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.cream,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: colors.terracotta,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
  },
  heroButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 14,
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
  featuredRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  featuredCard: {
    marginRight: spacing.md,
  },
  loadingIndicator: {
    marginTop: spacing.xl,
  },
  emptyText: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontFamily: fonts.body,
  },
});
