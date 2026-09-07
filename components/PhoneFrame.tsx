import { ReactNode, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';

type Props = {
  children: ReactNode;
};

const webPhoneShadow =
  Platform.OS === 'web'
    ? ({ boxShadow: '0 30px 90px rgba(0,0,0,0.7)' } as Record<string, string>)
    : null;

export default function PhoneFrame({ children }: Props) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.body.style.backgroundColor = '#000';
    document.body.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
  }, []);

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.desk}>
      <View style={[styles.phone, webPhoneShadow]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  desk: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  phone: {
    width: 375,
    height: 812,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.offWhite,
  },
});
