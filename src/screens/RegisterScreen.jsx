import { Button, Input, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('auth.currentUser ', auth.currentUser);
        auth.currentUser &&
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl,
          })
            .then(() => console.log('Updated Profile', auth.currentUser))
            .catch((error) => console.log({ error }));
        // auth.currentUser &&
        //   sendEmailVerification(auth.currentUser)
        //     .then(() => console.log('sent email verification!'))
        //     .catch((error) => console.log({ error }));
      })
      .catch((error) => {
        console.log({ error });
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
      }}
    >
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>

      <View style={{ width: 300 }}>
        <Input placeholder="Full Name" autoFocus value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Input
          placeholder="Profile Picture URL (optional)"
          value={imageUrl}
          onChangeText={setImageUrl}
          onSubmitEditing={register}
        />
      </View>

      <Button title="Register" onPress={register} style={{ width: 200, marginTop: 10 }} />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
