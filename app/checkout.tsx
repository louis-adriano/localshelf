import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';
import { formatPrice } from '../data/books';
import { LOCALSHELF_FEE, useCart } from '../context/CartContext';

type PaymentMethod = 'apple' | 'paypal' | 'afterpay';

export default function CheckoutScreen() {
  const { items, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('apple');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + LOCALSHELF_FEE;
  const installment = total / 4;

  const paymentOptions: { id: PaymentMethod; label: string; detail?: string }[] = [
    { id: 'apple', label: '🍎 Apple Pay' },
    { id: 'paypal', label: '🅿️ PayPal' },
    { id: 'afterpay', label: 'Afterpay', detail: `4 x ${formatPrice(installment)}` },
  ];

  const handleCompletePurchase = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(`#LS-${randomNumber}`);
    setShowSuccess(true);
  };

  const handleContinueShopping = () => {
    setShowSuccess(false);
    clearCart();
    router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Checkout" showBack />

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <View style={styles.paymentList}>
          {paymentOptions.map((option) => {
            const isSelected = option.id === selectedMethod;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
                onPress={() => setSelectedMethod(option.id)}
              >
                <Text style={styles.paymentLabel}>{option.label}</Text>
                {option.detail && (
                  <Text style={styles.paymentDetail}>{option.detail}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompletePurchase}
        >
          <Text style={styles.completeButtonText}>Complete Purchase</Text>
        </TouchableOpacity>
      </ScrollView>
      <Disclaimer />

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <Text style={styles.successCheckmark}>✅</Text>
          <Text style={styles.successHeading}>Order Confirmed!</Text>
          <Text style={styles.successMessage}>
            Thanks for supporting local Australian authors. Your book will be
            with you soon.
          </Text>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    ...shadow,
  },
  summaryLabel: {
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
  },
  summaryValue: {
    fontSize: 22,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  paymentList: {
    marginHorizontal: spacing.lg,
    gap: spacing.md,
  },
  paymentCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadow,
  },
  paymentCardSelected: {
    borderColor: colors.forest,
  },
  paymentLabel: {
    fontSize: 15,
    fontFamily: fonts.body,
    fontWeight: '700',
    color: colors.textDark,
  },
  paymentDetail: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 4,
  },
  completeButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    ...shadow,
  },
  completeButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
  successOverlay: {
    flex: 1,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successCheckmark: {
    fontSize: 72,
  },
  successHeading: {
    fontSize: 24,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 21,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.terracotta,
    marginTop: spacing.lg,
  },
  continueButton: {
    backgroundColor: colors.forest,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  continueButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
});
