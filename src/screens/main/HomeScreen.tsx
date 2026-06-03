import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeed, toggleLikePost } from '../../api/feed.api';
import { getActiveStories } from '../../api/stories.api';
import { useAuthStore } from '../../store/auth.store';
import { Avatar, SkeletonLoader } from '../../components/shared/AppComponents';

const HomeScreen = ({ navigation }: any) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [filter, setFilter] = useState('');

  // Queries
  const { data: feedData, isLoading: isFeedLoading, refetch } = useQuery({
    queryKey: ['feed', { filter }],
    queryKeyHashFn: () => `feed-${filter}`,
    queryFn: () => getFeed(1, 10, filter)
  });

  const { data: storiesData } = useQuery({
    queryKey: ['stories'],
    queryFn: () => getActiveStories()
  });

  const rawFeedItems = Array.isArray(feedData)
    ? feedData
    : feedData?.posts ?? feedData?.data?.posts ?? [];
  const feedItems = rawFeedItems.map((item: any, index: number) => ({
    ...item,
    id: item.id ?? item.ID ?? `feed-${index}`,
    user: item.user ?? {
      avatar_url: item.user_image,
      fname: item.first_name ?? item.username ?? 'User',
      lname: item.last_name ?? '',
    },
    privacy: item.privacy ?? item.postprivacy ?? '',
    content: item.content ?? '',
    like_count: Number(item.like_count ?? item.likes ?? 0),
    comment_count: Number(item.comment_count ?? item.comments ?? 0),
    is_liked: item.is_liked ?? Boolean(item.liked_status),
  }));
  console.log('Fetched feed items===>', feedItems);
  const stories = Array.isArray(storiesData) ? storiesData : storiesData?.data ?? [];

  // Mutator for likes (Optimistic updates implementation)
  const likeMutation = useMutation({
    mutationFn: toggleLikePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });
      const previousFeed = queryClient.getQueryData(['feed']);
      
      queryClient.setQueryData(['feed'], (old: any) => {
        if (!old) return old;
        return old.map((post: any) => {
          if (post.id === postId) {
            return {
              ...post,
              like_count: post.is_liked ? post.like_count - 1 : post.like_count + 1,
              is_liked: !post.is_liked
            };
          }
          return post;
        });
      });
      return { previousFeed };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['feed'], context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    }
  });

  const renderPostItem = ({ item }: any) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar uri={item.user?.avatar_url} fallback={item.user?.fname || 'U'} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.user?.fname} {item.user?.lname}</Text>
          <Text style={styles.privacy}>{(item.privacy ?? '').toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => likeMutation.mutate(item.id)} style={styles.actionBtn}>
          <Text style={styles.actionIcon}>{item.is_liked ? '❤️' : '🖤'}</Text>
          <Text style={styles.actionText}>{item.like_count || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })} style={styles.actionBtn}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comment_count || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header info */}
        <View style={styles.topHeader}>
          <Text style={styles.welcome}>Feed Wall</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notifyBtn}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Story row horizontal simulator */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyScroll}>
            <TouchableOpacity style={styles.addStoryBtn} onPress={() => Alert.alert('Upload Story', 'Select media from camera or device gallery.')}>
              <View style={styles.storyRingAdd}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>+</Text>
              </View>
              <Text style={styles.storyName}>My Story</Text>
            </TouchableOpacity>
            {/* Story item loops */}
            {stories.map((story: any) => (
              <TouchableOpacity key={story.id} style={styles.storyItem}>
                <Avatar uri={story.user?.avatar_url} size={50} fallback={story.user?.fname} />
                <Text style={styles.storyName} numberOfLines={1}>{story.user?.fname}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter segment tabs */}
        <View style={styles.filterRow}>
          {['', 'trending', 'images', 'reels'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, filter === f ? styles.activeTab : null]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterTabText, filter === f ? styles.activeTabText : null]}>
                {f === '' ? 'ALL' : f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Posts wall feed */}
        {isFeedLoading ? (
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={item => item.toString()}
            renderItem={() => <SkeletonLoader />}
          />
        ) : (
          <FlatList
            data={feedItems}
            keyExtractor={(item, index) => (item?.id ?? `feed-${index}`).toString()}
            renderItem={renderPostItem}
            onRefresh={refetch}
            refreshing={false}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Feed is currently empty.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  notifyBtn: {
    padding: 8,
  },
  storiesContainer: {
    height: 90,
    marginBottom: 12,
  },
  storyScroll: {
    flexDirection: 'row',
  },
  addStoryBtn: {
    alignItems: 'center',
    marginRight: 12,
  },
  storyRingAdd: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A56DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 12,
    width: 60,
  },
  storyName: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#1A56DB',
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerInfo: {
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  privacy: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 2,
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
  }
});

export default HomeScreen;
