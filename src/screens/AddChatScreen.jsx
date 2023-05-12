import { FontAwesome } from '@expo/vector-icons';
import { Button, Input } from '@rneui/themed';
import { addDoc, collection } from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);
  const createChat = async () => {
    await addDoc(collection(db, 'chats'), { chatName: input })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };
  return (
    <View style={{ backgroundColor: 'white', padding: 30, height: '100%' }}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={createChat}
        leftIcon={<FontAwesome name="wechat" size={24} color="black" />}
      />
      <Button disabled={!input} title="Create new Chat" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;
