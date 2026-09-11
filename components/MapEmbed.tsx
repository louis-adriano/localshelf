import { createElement } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { radius } from '../constants/theme';

type Props = {
  url: string;
  height: number;
};

export default function MapEmbed({ url, height }: Props) {
  return (
    <View style={[styles.container, { height }]}>
      {Platform.OS === 'web'
        ? createElement('iframe', {
            src: url,
            style: { border: 0, width: '100%', height: '100%' },
            loading: 'lazy',
            title: 'Map',
          })
        : <WebView source={{ uri: url }} style={styles.webview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});
