import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
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
import { insertBook } from '../lib/books';

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
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    title: string;
    message: string;
    buttonLabel: string;
    onDismiss?: () => void;
  } | null>(null);

  const resetForm = () => {
    setTitle('');
    setName('');
    setState(null);
    setGenre(null);
    setFormat(null);
    setPrice('');
    setDescription('');
  };

  const handleSubmit = async () => {
    if (!title || !name || !state || !genre || !format || !price || !description) {
      Alert.alert('Missing information', 'Please fill in all fields before submitting.');
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    try {
      await insertBook({
        title,
        author: name,
        price: parseFloat(price),
        state,
        description,
      });
      setFeedback({
        title: 'Book Listed!',
        message:
          "Your book has been submitted and is now live on LocalShelf. Our team will review it within 24 hours — but readers can already find it in the store.",
        buttonLabel: 'Great!',
        onDismiss: resetForm,
      });
    } catch {
      setFeedback({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        buttonLabel: 'OK',
      });
    } finally {
      setSubmitting(false);
    }
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

      <Modal
        visible={feedback !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setFeedback(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{feedback?.title}</Text>
            <Text style={styles.modalMessage}>{feedback?.message}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                const onDismiss = feedback?.onDismiss;
                setFeedback(null);
                onDismiss?.();
              }}
            >
              <Text style={styles.modalButtonText}>{feedback?.buttonLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 58, 43, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.lg,
  },
  modalButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 14,
  },
});
