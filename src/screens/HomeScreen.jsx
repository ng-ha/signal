import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CustomListItem from '../components/CustomListItem';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth/react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  console.log(chats);
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out!');
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log({ error });
        alert(error.message);
      });
  };
  useEffect(
    () =>
      onSnapshot(collection(db, 'chats'), (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }),
    []
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTitleAlign: 'center',
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={onSignOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL || undefined }} />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', { id, chatName });
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ height: '100%' }}>
        {chats.map(({ id, chatName }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
