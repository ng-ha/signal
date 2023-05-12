import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { auth, db } from '../firebase';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  console.log(messages);
  useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'hello',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            rounded
            source={
              !!messages[0]
                ? { uri: messages[0].photoURL }
                : require('../../assets/images/Profile_avatar_placeholder_large.png')
            }
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [messages, navigation]);

  const sendMessage = () => {
    addDoc(collection(db, 'chats', route.params.id, 'messages'), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      photoURL: auth.currentUser?.photoURL,
    });
    setInput('');
  };

  useLayoutEffect(
    () =>
      onSnapshot(
        query(collection(db, 'chats', route.params.id, 'messages'), orderBy('timestamp', 'asc')),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [route]
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, displayName, message, photoURL, email }) =>
              email === auth.currentUser?.email ? (
                <View
                  key={id}
                  style={{
                    padding: 15,
                    backgroundColor: '#ececec',
                    alignSelf: 'flex-end',
                    borderRadius: 20,
                    marginRight: 15,
                    marginBottom: 20,
                    maxWidth: '80%',
                  }}
                >
                  <Avatar
                    source={{ uri: photoURL }}
                    rounded
                    size={30}
                    position="absolute"
                    bottom={-15}
                    right={-5}
                    //web
                    containerStyle={{
                      position: 'absolute',
                      bottom: -15,
                      right: -5,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      marginLeft: 10,
                    }}
                  >
                    {message}
                  </Text>
                </View>
              ) : (
                <View
                  key={id}
                  style={{
                    padding: 15,
                    backgroundColor: '#2b68e6',
                    alignSelf: 'flex-start',
                    borderRadius: 20,
                    marginLeft: 15,
                    marginBottom: 20,
                    maxWidth: '80%',
                  }}
                >
                  <Avatar
                    source={{ uri: photoURL }}
                    rounded
                    size={30}
                    position="absolute"
                    bottom={-15}
                    left={-5}
                    containerStyle={{
                      position: 'absolute',
                      bottom: -15,
                      left: -5,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      marginLeft: 10,
                      marginBottom: 10,
                    }}
                  >
                    {message}
                  </Text>
                  <Text
                    style={{
                      left: 10,
                      paddingRight: 10,
                      fontSize: 10,
                      color: 'white',
                    }}
                  >
                    {displayName}
                  </Text>
                </View>
              )
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
          }}
        >
          <TextInput
            placeholder="Signal Message"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            style={{
              bottom: 0,
              height: 40,
              flex: 1,
              marginRight: 15,
              backgroundColor: '#ececec',
              borderRadius: 30,
              padding: 10,
              color: 'gray',
            }}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#2b68e8" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
