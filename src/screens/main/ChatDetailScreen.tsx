import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversation, sendMessage } from '../../api/chat.api';

const ChatDetailScreen = ({ route, navigation }: any) => {
  const { roomId, recipientName } = route.params;
  const queryClient = useQueryClient();
  const [inputText, setInputText] = useState('');

  const username = recipientName.replace(/\s+/g, '').toLowerCase();

  const { data: messagesData } = useQuery({
    queryKey: ['chat', username],
    queryFn: () => getConversation(username)
  });

  const sendMutation = useMutation({
    mutationFn: (msg: string) => sendMessage(5, msg),
    onMutate: async (newMsgText) => {
      await queryClient.cancelQueries({ queryKey: ['chat', username] });
      const previousChat = queryClient.getQueryData(['chat', username]);
      queryClient.setQueryData(['chat', username], (old: any) => {
        const fallbackList = Array.isArray(old) ? old : [];
        return [
          ...fallbackList,
          {
            id: Date.now(),
            sender_id: 5,
            receiver_id: 6,
            message: newMsgText,
            created_at: new Date().toISOString()
          }
        ];
      });
      return { previousChat };
    },
    onError: (err, newMsg, context) => {
      queryClient.setQueryData(['chat', username], context?.previousChat);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', username] });
    }
  });

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMutation.mutate(inputText);
    setInputText('');
  };

  const messagesList = Array.isArray(messagesData) ? messagesData : [
    { id: 1, sender_id: 6, receiver_id: 5, message: 'Hi Alex, did you review the floor plans?', created_at: '10:00 AM' },
    { id: 2, sender_id: 5, receiver_id: 6, message: 'Yes! They look perfect. Let’s confirm the appointment for Tuesday.', created_at: '10:32 AM' }
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.navBack}>← Inbox</Text>
          </TouchableOpacity>
          <Text style={styles.nameTitle}>{recipientName}</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={messagesList}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isMe = item.sender_id === 5;
            return (
              <View style={[styles.bubbleRow, isMe ? styles.myBubbleRow : styles.otherBubbleRow]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                  <Text style={[styles.bubbleText, isMe ? styles.myBubbleText : styles.otherBubbleText]}>
                    {item.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardContainer: {
    flex: 1,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  navBack: {
    fontSize: 15,
    color: '#1A56DB',
    fontWeight: '600',
  },
  nameTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 12,
    width: '100%',
  },
  myBubbleRow: {
    justifyContent: 'flex-end',
  },
  otherBubbleRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: '#1A56DB',
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bubbleText: {
    fontSize: 14,
  },
  myBubbleText: {
    color: '#FFFFFF',
  },
  otherBubbleText: {
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#111827',
  },
  sendButton: {
    marginLeft: 12,
    paddingHorizontal: 12,
  },
  sendText: {
    color: '#1A56DB',
    fontWeight: '700',
    fontSize: 14,
  }
});

export default ChatDetailScreen;

