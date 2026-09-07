import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';
import { Book, formatPrice } from '../data/books';

type Props = {
  book: Book;
};

export default function BookListRow({ book }: Props) {
  const goToDetail = () => {
    router.push({ pathname: '/book/[id]', params: { id: book.id } });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={goToDetail} activeOpacity={0.85}>
      <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
        <Text style={styles.coverText} numberOfLines={4}>
          {book.title}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.location}>
          📍 {book.bookstoreName}, {book.state}
        </Text>
        <Text style={styles.rating}>
          ⭐ {book.rating.toFixed(1)} ({book.reviewCount} reviews)
        </Text>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    ...shadow,
  },
  cover: {
    width: 68,
    height: 96,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    padding: 6,
  },
  coverText: {
    color: 'rgba(255,255,255,0.92)',
    fontFamily: fonts.heading,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.textDark,
  },
  author: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textDark,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 4,
  },
});
