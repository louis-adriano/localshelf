import { ReactNode, useEffect } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';

type Props = {
  children: ReactNode;
};

const MOBILE_BREAKPOINT = 480;

const webDeskStyle =
  Platform.OS === 'web'
    ? ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } as Record<string, string | number>)
    : null;

const webPhoneStyle =
  Platform.OS === 'web'
    ? ({
        width: '375px',
        height: '720px',
        borderRadius: '40px',
        overflow: 'hidden',
        border: '2px solid #333',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        position: 'relative',
        backgroundColor: '#EDE8DF',
      } as Record<string, string>)
    : null;

export default function PhoneFrame({ children }: Props) {
  const { width } = useWindowDimensions();
  const showFrame = Platform.OS === 'web' && width >= MOBILE_BREAKPOINT;

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }, []);

  if (!showFrame) {
    return <>{children}</>;
  }

  return (
    <View style={webDeskStyle}>
      <View style={webPhoneStyle}>{children}</View>
    </View>
  );
}
