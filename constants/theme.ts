import { Platform } from 'react-native';

export const colors = {
  forest: '#1C3A2B',
  forestLight: '#2A4F3B',
  terracotta: '#C4622D',
  terracottaDark: '#A84F22',
  offWhite: '#FAF7F2',
  cream: '#EDE8DF',
  gold: '#D4A72C',
  white: '#FFFFFF',
  textDark: '#2E2A24',
  textMuted: '#8A7F70',
  border: '#E2DACD',
};

export const fonts = {
  heading: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, "Times New Roman", serif',
  }),
  body: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }),
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};
