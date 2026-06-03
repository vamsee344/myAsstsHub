import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../components/shared/AppComponents';

const ChatInboxScreen = ({ navigation }: any) => {
  const rooms = [
    {
      id: 'chat-1',
      recipientName: 'Robert Langdon',
      lastMessage: 'Let’s confirm the appointment for Tuesday.',
      lastMessageTime: '10:32 AM',
      unreadCount: 2,
      online: true,
    },
    {
      id: 'chat-2',
      recipientName: 'Diana Prince',
      lastMessage: 'Will send the updated offer copy.',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      online: false,
    }
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages Inbox</Text>

        <FlatList
          data={rooms}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatDetail', { roomId: item.id, recipientName: item.recipientName })}
              activeOpacity={0.8}
              style={styles.roomRow}
            >
              <View style={styles.avatarContainer}>
                <Avatar fallback={item.recipientName} />
                {item.online && <View style={styles.onlineBadge} />}
              </View>

              <View style={styles.messageContent}>
                <View style={styles.row}>
                  <Text style={styles.name}>{item.recipientName}</Text>
                  <Text style={styles.time}>{item.lastMessageTime}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                  {item.unreadCount > 0 && (
                    <View style={styles.unreadCountBadge}>
                      <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  roomRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0E9F6E',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  messageContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  lastMessage: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    marginRight: 12,
  },
  unreadCountBadge: {
    backgroundColor: '#1A56DB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCountText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  }
});

export default ChatInboxScreen;

