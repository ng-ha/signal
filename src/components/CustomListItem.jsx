import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, ListItem } from '@rneui/themed';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'desc')),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    []
  );
  return (
    <ListItem onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={
          !!messages[0]
            ? { uri: messages[0].photoURL }
            : require('../../assets/images/Profile_avatar_placeholder_large.png')
        }
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '700' }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {!!messages[0]
            ? messages[0]?.displayName + ': ' + messages[0]?.message
            : 'Say Hi to everyone !'}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
