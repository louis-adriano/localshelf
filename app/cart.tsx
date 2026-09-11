import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';
import { formatPrice } from '../data/books';
import { LOCALSHELF_FEE, useCart } from '../context/CartContext';

export default function CartScreen() {
  const { items, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + LOCALSHELF_FEE;

  if (items.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="Your Cart" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/browse')}
          >
            <Text style={styles.browseButtonText}>Browse Books</Text>
          </TouchableOpacity>
        </View>
        <Disclaimer />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Your Cart" subtitle={`${items.length} item${items.length === 1 ? '' : 's'}`} />

        <View style={styles.itemList}>
          {items.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.itemCard}>
              <View style={[styles.itemCover, { backgroundColor: item.coverColor }]} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.itemAuthor}>{item.author}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
                hitSlop={8}
                accessibilityLabel={`Remove ${item.title} from cart`}
                accessibilityRole="button"
              >
                <Ionicons name="trash-outline" size={20} color={colors.terracotta} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>LocalShelf fee</Text>
            <Text style={styles.summaryValue}>{formatPrice(LOCALSHELF_FEE)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.body,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  browseButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.lg,
  },
  browseButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 14,
  },
  itemList: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadow,
  },
  itemCover: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    marginRight: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.textDark,
  },
  itemAuthor: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 4,
  },
  removeButton: {
    padding: spacing.xs,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    ...shadow,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textDark,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
  },
  checkoutButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    ...shadow,
  },
  checkoutButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
});
