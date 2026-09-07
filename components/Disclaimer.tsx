import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants/theme';

export default function Disclaimer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        LocalShelf is a class assignment demo and not for commercial purposes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.offWhite,
  },
  text: {
    fontSize: 10,
    fontFamily: fonts.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
