import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ChipSelect from '../components/ChipSelect';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { AustralianState, BookFormat } from '../data/books';

const STATES: AustralianState[] = ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS'];
const GENRES = [
  'Literary Fiction',
  'Mystery',
  'Thriller',
  'Romance',
  'Fantasy',
  'Poetry',
  'Memoir',
  'Historical Fiction',
  'Short Stories',
  'Contemporary Fiction',
];
const FORMATS: BookFormat[] = ['Digital', 'Print'];

export default function ListBookScreen() {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<AustralianState | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [format, setFormat] = useState<BookFormat | null>(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setName('');
    setState(null);
    setGenre(null);
    setFormat(null);
    setPrice('');
    setDescription('');
  };

  const handleSubmit = () => {
    if (!title || !name || !state || !genre || !format || !price || !description) {
      Alert.alert('Missing information', 'Please fill in all fields before submitting.');
      return;
    }
    Alert.alert(
      'Success',
      "Listing submitted for review! We'll notify you within 48 hours. (Demo purposes only)",
    );
    resetForm();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="List Your Book" subtitle="Reach local readers near you" />

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Book Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. The Bookseller of Fitzroy"
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.inputLabel}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
          />

          <ChipSelect
            label="State"
            options={STATES}
            selected={state}
            onSelect={(value) => setState(value as AustralianState)}
          />

          <ChipSelect
            label="Genre"
            options={GENRES}
            selected={genre}
            onSelect={setGenre}
          />

          <ChipSelect
            label="Format"
            options={FORMATS}
            selected={format}
            onSelect={(value) => setFormat(value as BookFormat)}
          />

          <Text style={styles.inputLabel}>Price (AUD)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="e.g. 19.99"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />

          <Text style={styles.inputLabel}>Short Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Tell readers about your book..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={5}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Listing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Disclaimer />
    </KeyboardAvoidingView>
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
  formCard: {
    backgroundColor: colors.cream,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: fonts.body,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    backgroundColor: colors.white,
  },
  descriptionInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.forest,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  submitButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 15,
  },
});
