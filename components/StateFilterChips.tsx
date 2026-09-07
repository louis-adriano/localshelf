import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';
import { AustralianState } from '../data/books';

export type StateFilter = 'All' | AustralianState;

const STATES: StateFilter[] = ['All', 'VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS'];

type Props = {
  selected: StateFilter;
  onSelect: (state: StateFilter) => void;
};

export default function StateFilterChips({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {STATES.map((state) => {
        const isActive = state === selected;
        return (
          <TouchableOpacity
            key={state}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(state)}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {state}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: 32 + spacing.md * 2,
    flexGrow: 0,
    flexShrink: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  chip: {
    alignSelf: 'flex-start',
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.forest,
    backgroundColor: 'transparent',
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.forest,
  },
  chipText: {
    color: colors.forest,
    fontFamily: fonts.body,
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
  },
  chipTextActive: {
    color: colors.white,
  },
});
