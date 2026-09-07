import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Disclaimer from '../../components/Disclaimer';
import Header from '../../components/Header';
import { colors, fonts, radius, shadow, spacing } from '../../constants/theme';
import { Book, formatPrice } from '../../data/books';
import { fetchBookById } from '../../lib/books';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchBookById(id)
      .then((result) => {
        if (!cancelled) setBook(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load book.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Header title="Book Details" showBack />
        <ActivityIndicator
          color={colors.forest}
          size="large"
          style={styles.loadingIndicator}
        />
        <Disclaimer />
      </View>
    );
  }

  if (error || !book) {
    return (
      <View style={styles.screen}>
        <Header title="Book Not Found" showBack />
        <Text style={styles.notFound}>
          {error ?? "We couldn't find that book. It may have been removed."}
        </Text>
        <Disclaimer />
      </View>
    );
  }

  const handleBuyNow = () => {
    Alert.alert(
      'Order placed! 🎉',
      'Your book will be delivered within 5–7 business days. (This is a demo for class purposes)',
    );
  };

  const handleWishlist = () => {
    Alert.alert('Added to wishlist!');
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Book Details" showBack />

        <View style={styles.content}>
          <View style={styles.coverWrapper}>
            <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
              <Text style={styles.coverText}>{book.title}</Text>
            </View>
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.location}>
            📍 {book.bookstoreName}, {book.state}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.rating}>
              ⭐ {book.rating.toFixed(1)} ({book.reviewCount} reviews)
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{formatPrice(book.price)}</Text>
          </View>

          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <Text style={styles.buyButtonText}>
              Buy Now — {formatPrice(book.price)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlist}>
            <Text style={styles.wishlistButtonText}>Add to Wishlist</Text>
          </TouchableOpacity>
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
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  coverWrapper: {
    alignItems: 'center',
  },
  cover: {
    width: '60%',
    aspectRatio: 0.68,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    ...shadow,
  },
  coverText: {
    color: 'rgba(255,255,255,0.92)',
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  author: {
    fontSize: 15,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  location: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  rating: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textDark,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    lineHeight: 21,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  priceLabel: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
  },
  price: {
    fontSize: 28,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
  },
  buyButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadow,
  },
  buyButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
  wishlistButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.forest,
  },
  wishlistButtonText: {
    color: colors.forest,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
  notFound: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    color: colors.textMuted,
    fontFamily: fonts.body,
  },
  loadingIndicator: {
    marginTop: spacing.xl,
  },
});
