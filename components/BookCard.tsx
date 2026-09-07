import { router } from 'expo-router';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';
import { Book, formatPrice } from '../data/books';

type Props = {
  book: Book;
  style?: StyleProp<ViewStyle>;
};

export default function BookCard({ book, style }: Props) {
  const goToDetail = () => {
    router.push({ pathname: '/book/[id]', params: { id: book.id } });
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={goToDetail}
      activeOpacity={0.85}
    >
      <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
        <View style={styles.stateBadge}>
          <Text style={styles.stateBadgeText}>{book.state}</Text>
        </View>
        <Text style={styles.coverText} numberOfLines={4}>
          {book.title}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <Text style={styles.rating}>
          ⭐ {book.rating.toFixed(1)} ({book.reviewCount})
        </Text>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    padding: spacing.sm,
    ...shadow,
  },
  cover: {
    width: '100%',
    height: 130,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  stateBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: radius.xl,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  stateBadgeText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontSize: 10,
    fontWeight: '700',
  },
  coverText: {
    color: 'rgba(255,255,255,0.92)',
    fontFamily: fonts.heading,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  info: {
    marginTop: spacing.sm,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.textDark,
  },
  author: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  rating: {
    fontSize: 11,
    fontFamily: fonts.body,
    color: colors.textDark,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 4,
  },
});
