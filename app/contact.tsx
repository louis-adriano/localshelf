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
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import { colors, fonts, radius, spacing } from '../constants/theme';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }
    Alert.alert('Success', "Message sent! We'll get back to you within 48 hours.");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Contact Us" subtitle="We'd love to hear from you" />

        <View style={styles.detailsCard}>
          <Text style={styles.detailLabel}>ABN</Text>
          <Text style={styles.detailValue}>12 345 678 901</Text>

          <Text style={[styles.detailLabel, { marginTop: spacing.md }]}>
            Address
          </Text>
          <Text style={styles.detailValue}>
            123 Brunswick St{'\n'}Fitzroy VIC 3065{'\n'}Australia
          </Text>

          <Text style={[styles.detailLabel, { marginTop: spacing.md }]}>
            Email
          </Text>
          <Text style={styles.detailValue}>hello@localshelf.com.au</Text>

          <Text style={[styles.detailLabel, { marginTop: spacing.md }]}>
            Phone
          </Text>
          <Text style={styles.detailValue}>(03) 9000 0000</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Send us a message</Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={setMessage}
            placeholder="How can we help?"
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
  detailsCard: {
    backgroundColor: colors.cream,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: fonts.body,
    fontWeight: '700',
    color: colors.terracotta,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    marginTop: 2,
    lineHeight: 20,
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
  formTitle: {
    fontSize: 17,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: spacing.md,
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
  messageInput: {
    height: 100,
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
