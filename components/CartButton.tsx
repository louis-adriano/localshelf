import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';
import { useCart } from '../context/CartContext';

type Props = {
  tint: string;
};

export default function CartButton({ tint }: Props) {
  const { items } = useCart();
  const count = items.length;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('/cart')}
      hitSlop={10}
      accessibilityLabel="Cart"
      accessibilityRole="button"
    >
      <Ionicons name="bag-outline" size={24} color={tint} />
      {count > 0 && (
        <View style={styles.badge} pointerEvents="none">
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D0342C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
