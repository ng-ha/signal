import { Button, Image, Input } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth/react-native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { auth } from '../firebase';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.replace('Home');
        }
      }),
    []
  );

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in: ', userCredential);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={100}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
      }}
    >
      <StatusBar style="light" />
      <Image
        source={require('../../assets/images/Signal-Logo.png')}
        style={{ width: 150, height: 150, borderRadius: 16 }}
      />
      <View style={{ width: 300 }}>
        <Input
          placeholder="Email"
          autoFocus
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={{ width: 200, marginTop: 10 }} title="Login" onPress={signIn} />
      <Button
        containerStyle={{ width: 200, marginTop: 10 }}
        title="Register"
        type="outline"
        onPress={() => navigation.navigate('Register')}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
