import { router, useLocalSearchParams } from 'expo-router';
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
import MapEmbed from '../../components/MapEmbed';
import { colors, fonts, radius, shadow, spacing } from '../../constants/theme';
import { Book, buildMapEmbedUrl, formatPrice } from '../../data/books';
import { fetchBookById } from '../../lib/books';
import { useCart } from '../../context/CartContext';

const BOOKSTORE_COORDS: Record<string, { lat: number; lng: number }> = {
  'Fitzroy Books': { lat: -37.7963, lng: 144.9778 },
  'Newtown Reads': { lat: -33.8975, lng: 151.1786 },
  'West End Words': { lat: -27.4785, lng: 152.9987 },
  'Freo Book Co': { lat: -32.0569, lng: 115.7439 },
  'Carlton Reads': { lat: -37.7882, lng: 144.9698 },
  'Hills Books SA': { lat: -34.9285, lng: 138.6007 },
  'Top End Books': { lat: -12.4634, lng: 130.8456 },
  'Salamanca Reads': { lat: -42.8826, lng: 147.3257 },
  'Capital Books': { lat: -35.2809, lng: 149.13 },
  'Circular Quay Books': { lat: -33.861, lng: 151.2102 },
  'Readings Carlton': { lat: -37.7882, lng: 144.9698 },
  Gleebooks: { lat: -33.889, lng: 151.178 },
  'Healesville Books': { lat: -37.6566, lng: 145.5122 },
  'Geelong Book Co': { lat: -38.1499, lng: 144.3617 },
  'Footscray Community Books': { lat: -37.8001, lng: 144.9 },
  'Imprints Booksellers': { lat: -34.9285, lng: 138.6007 },
  'Fullers Bookshop': { lat: -41.4332, lng: 147.1441 },
  'Harry Hartog Canberra': { lat: -35.2809, lng: 149.13 },
  'Bangalow Books': { lat: -28.6831, lng: 153.5228 },
  'Surfers Books': { lat: -28.0023, lng: 153.4145 },
  'Fremantle Arts Books': { lat: -32.0569, lng: 115.7439 },
  'Sticky Institute': { lat: -37.8136, lng: 144.9631 },
};

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

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

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timeout);
  }, [showToast]);

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
    addToCart(book);
    router.push('/checkout');
  };

  const handleWishlist = () => {
    Alert.alert('Added to wishlist!');
  };

  const handleAddToCart = () => {
    addToCart(book);
    setShowToast(true);
  };

  const coords = BOOKSTORE_COORDS[book.bookstoreName];

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

          <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
            <Text style={styles.buyButtonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleBuyNow}>
            <Text style={styles.secondaryButtonText}>
              Buy Now — {formatPrice(book.price)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlist}>
            <Text style={styles.wishlistButtonText}>Add to Wishlist</Text>
          </TouchableOpacity>

          {coords && (
            <>
              <Text style={styles.mapSectionTitle}>📍 Find this Bookstore</Text>
              <View style={styles.mapWrapper}>
                <MapEmbed
                  url={buildMapEmbedUrl(coords.lat, coords.lng)}
                  height={180}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {showToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Added to cart!</Text>
        </View>
      )}

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
  secondaryButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.forest,
  },
  secondaryButtonText: {
    color: colors.forest,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
  toast: {
    position: 'absolute',
    bottom: 56,
    left: spacing.xl,
    right: spacing.xl,
    backgroundColor: colors.forest,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadow,
  },
  toastText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 14,
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
  mapSectionTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  mapWrapper: {
    ...shadow,
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
