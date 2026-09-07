import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';

type Props = {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function ChipSelect({ label, options, selected, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {options.map((option) => {
          const isActive = option === selected;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onSelect(option)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontFamily: fonts.body,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  row: {
    gap: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.terracotta,
    backgroundColor: colors.white,
    marginRight: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.terracotta,
  },
  chipText: {
    color: colors.forest,
    fontFamily: fonts.body,
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.white,
  },
});
