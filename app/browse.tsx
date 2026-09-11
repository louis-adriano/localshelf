import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BookCard from '../components/BookCard';
import CartButton from '../components/CartButton';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import StateFilterChips, { StateFilter } from '../components/StateFilterChips';
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';
import { Book } from '../data/books';
import { fetchBooks } from '../lib/books';

export default function BrowseScreen() {
  const [selectedState, setSelectedState] = useState<StateFilter>('All');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchBooks({ state: selectedState, search: debouncedSearch })
      .then((result) => {
        if (!cancelled) setBooks(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load books.');
          setBooks([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedState, debouncedSearch]);

  return (
    <View style={styles.screen}>
      <Header
        title="Browse Books"
        subtitle={`${books.length} book${books.length === 1 ? '' : 's'} available`}
        rightAccessory={<CartButton tint={colors.cream} />}
      />

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Search books, authors, bookstores..."
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <StateFilterChips selected={selectedState} onSelect={setSelectedState} />

      {loading ? (
        <ActivityIndicator
          color={colors.forest}
          size="large"
          style={styles.loadingIndicator}
        />
      ) : error ? (
        <Text style={styles.emptyText}>{error}</Text>
      ) : (
        <FlatList
          data={books}
          key="grid-2"
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <BookCard book={item} style={styles.gridCard} />
          )}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No books found for this state.</Text>
          }
        />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: 14,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    ...shadow,
  },
  searchInput: {
    flex: 1,
    color: colors.textDark,
    fontFamily: fonts.body,
    fontSize: 14,
    padding: 0,
  },
  columnWrapper: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  gridCard: {
    flex: 1,
  },
  listContent: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  loadingIndicator: {
    marginTop: spacing.xl,
  },
  emptyText: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    color: colors.textMuted,
    fontFamily: fonts.body,
  },
});
