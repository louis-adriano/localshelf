import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
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
import { colors, fonts, radius, shadow, spacing } from '../constants/theme';

type Post = {
  id: string;
  username: string;
  avatarInitials: string;
  avatarColor: string;
  timestamp: string;
  text: string;
  bookTag?: string;
  likeCount: number;
  liked: boolean;
};

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    username: '@melbooks',
    avatarInitials: 'MB',
    avatarColor: '#6B3A5C',
    timestamp: '2h ago',
    text: 'Just finished The Bookseller of Fitzroy — absolutely beautiful. 5 stars ⭐⭐⭐⭐⭐',
    bookTag: 'The Bookseller of Fitzroy',
    likeCount: 24,
    liked: false,
  },
  {
    id: '2',
    username: '@priyawrites',
    avatarInitials: 'PW',
    avatarColor: '#8B4A2A',
    timestamp: '3h ago',
    text: 'Excited to announce my debut novel Brisbane River Nights is now live on LocalShelf!',
    bookTag: 'Brisbane River Nights',
    likeCount: 41,
    liked: false,
  },
  {
    id: '3',
    username: '@readingwithcal',
    avatarInitials: 'RC',
    avatarColor: '#2A4A6B',
    timestamp: '4h ago',
    text: 'Anyone else obsessed with Fremantle Tides? Callum Reeve is an incredible writer',
    bookTag: 'Fremantle Tides',
    likeCount: 18,
    liked: false,
  },
  {
    id: '4',
    username: '@poetrycorner',
    avatarInitials: 'PC',
    avatarColor: '#2E5C3A',
    timestamp: '6h ago',
    text: 'Sandstone Streets hit different at 1am on the train home. Okafor gets it.',
    bookTag: 'Sandstone Streets',
    likeCount: 12,
    liked: false,
  },
  {
    id: '5',
    username: '@elsierowntree',
    avatarInitials: 'ER',
    avatarColor: '#3A5C5C',
    timestamp: '8h ago',
    text: 'Cradle Mountain Ghosts paperback restock just landed at three stores across TAS 👻📚',
    bookTag: 'Cradle Mountain Ghosts',
    likeCount: 35,
    liked: false,
  },
  {
    id: '6',
    username: '@bookclub_manly',
    avatarInitials: 'BM',
    avatarColor: '#7B5C2E',
    timestamp: '12h ago',
    text: "Our book club picked Harbourside Whispers for October! Who else is reading along?",
    bookTag: 'Harbourside Whispers',
    likeCount: 9,
    liked: false,
  },
  {
    id: '7',
    username: '@sophienguyen_writes',
    avatarInitials: 'SN',
    avatarColor: '#6B3A5C',
    timestamp: '1d ago',
    text: 'Thank you all for the kind words on Adelaide Hills Almanac 🍇 means the world to a first-time author.',
    bookTag: 'Adelaide Hills Almanac',
    likeCount: 52,
    liked: false,
  },
  {
    id: '8',
    username: '@carltonlocal',
    avatarInitials: 'CL',
    avatarColor: '#2A4A6B',
    timestamp: '1d ago',
    text: 'Grabbed Carlton Corner Stories from the milk bar mentioned literally IN the book. Wild.',
    bookTag: 'Carlton Corner Stories',
    likeCount: 15,
    liked: false,
  },
  {
    id: '9',
    username: '@noosareads',
    avatarInitials: 'NR',
    avatarColor: '#8B4A2A',
    timestamp: '2d ago',
    text: 'Sunshine Coast Secrets kept me up way too late. Did NOT see that ending coming.',
    bookTag: 'Sunshine Coast Secrets',
    likeCount: 21,
    liked: false,
  },
  {
    id: '10',
    username: '@isabellecho',
    avatarInitials: 'IC',
    avatarColor: '#2E5C3A',
    timestamp: '3d ago',
    text: 'Margaret River Vines just crossed 100 reviews! Thank you LocalShelf readers 💜',
    bookTag: 'Margaret River Vines',
    likeCount: 67,
    liked: false,
  },
];

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [draft, setDraft] = useState('');

  const handlePost = () => {
    const text = draft.trim();
    if (!text) return;

    const newPost: Post = {
      id: `you-${Date.now()}`,
      username: 'You',
      avatarInitials: 'Y',
      avatarColor: colors.terracotta,
      timestamp: 'Just now',
      text,
      likeCount: 0,
      liked: false,
    };

    setPosts((current) => [newPost, ...current]);
    setDraft('');
  };

  const toggleLike = (id: string) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post,
      ),
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Community" subtitle="What readers & authors are saying" />

        <View style={styles.composerCard}>
          <TextInput
            style={styles.composerInput}
            value={draft}
            onChangeText={setDraft}
            placeholder="Share your thoughts..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={[styles.avatar, { backgroundColor: post.avatarColor }]}>
                <Text style={styles.avatarText}>{post.avatarInitials}</Text>
              </View>
              <View style={styles.postHeaderText}>
                <Text style={styles.username}>{post.username}</Text>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
              </View>
            </View>

            <Text style={styles.postText}>{post.text}</Text>

            {post.bookTag && (
              <View style={styles.bookTag}>
                <Text style={styles.bookTagText}>{post.bookTag}</Text>
              </View>
            )}

            <View style={styles.postFooter}>
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => toggleLike(post.id)}
              >
                <Ionicons
                  name={post.liked ? 'heart' : 'heart-outline'}
                  size={18}
                  color={post.liked ? colors.terracotta : colors.textMuted}
                />
                <Text
                  style={[styles.likeCount, post.liked && styles.likeCountActive]}
                >
                  {post.likeCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Disclaimer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  composerCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    ...shadow,
  },
  composerInput: {
    minHeight: 64,
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
  },
  postButtonText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 14,
  },
  postCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    ...shadow,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontWeight: '700',
    fontSize: 13,
  },
  postHeaderText: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontFamily: fonts.heading,
    fontWeight: '700',
    color: colors.forest,
  },
  timestamp: {
    fontSize: 11,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: 1,
  },
  postText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textDark,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  bookTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.forest,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    marginTop: spacing.sm,
  },
  bookTagText: {
    color: colors.cream,
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 11,
  },
  postFooter: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeCount: {
    fontSize: 13,
    fontFamily: fonts.body,
    fontWeight: '600',
    color: colors.textMuted,
  },
  likeCountActive: {
    color: colors.terracotta,
  },
});
