import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIoni from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import colors from '../../assets/consts/colors';
import CryptoJS from 'react-native-crypto-js';
import {KEY} from '@env';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const [formData, setFormData] = useState({
    regemail: '',
    fullname: '',
    phonenumber: '',
    password: '',
    checkpassword: '',
    showPassword: false,
    showCheckPassword: false,
  });
  const [keys, setKeys] = useState({public_key: {}, private_key: {}});
  const generateKeys = async () => {
    try {
      const response = await axios.get(
        'http://192.168.110.67:5000/generate_keys',
      );
      await setKeys(response.data);
    } catch (error) {
      console.info(error);
      console.error('Error generating keys', error);
    }
  };

  const encryptMessage = async message => {
    const {public_key} = keys;
    try {
      const response = await axios.post('http://192.168.110.67:5000/encrypt', {
        message,
        e: public_key.e,
        n: public_key.n,
      });
      return response.data.encrypted_message;
    } catch (error) {
      console.error('Error encrypting message', error);
    }
  };

  useEffect(() => {
    generateKeys();
  }, []);
  const handleInputChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  const handleSignUp = async () => {
    const {regemail, fullname, phonenumber, password, checkpassword} = formData;
    let ciphertext = null;

    // Email validation
    if (!regemail.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Please enter a valid Gmail address.');
      return;
    }

    // Phone number validation
    if (phonenumber.length !== 10) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a 10-digit phone number.',
      );
      return;
    }

    // Password validation
    if (password !== checkpassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match.');
      return;
    } else {
      ciphertext = CryptoJS.AES.encrypt(password, KEY).toString();
    }

    try {
      const response = await auth().createUserWithEmailAndPassword(
        regemail,
        password,
      );
      const {uid, emailVerified} = response.user;

      if (!emailVerified) {
        await response.user.sendEmailVerification();
        Alert.alert(
          'Email Verification',
          'A verification email has been sent to your email address. Please verify before logging in.',
        );
      }

      let encrypt_name = await encryptMessage(fullname);
      await AsyncStorage.setItem(
        'private_key',
        JSON.stringify(keys.private_key),
      );
      var a = await AsyncStorage.getItem('private_key');
      console.log('private_key hien tai', a);

      await firestore().collection('Users').doc(uid).set({
        name: encrypt_name,
        email: regemail,
        phone: phonenumber,
        password: ciphertext,
        gender: '',
        permission: 1,
        date_of_birth: '',
      });

      backloginscreen();
    } catch (error) {
      console.log('Sign up error:', error);
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setFormData(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const toggleCheckPasswordVisibility = () => {
    setFormData(prevState => ({
      ...prevState,
      showCheckPassword: !prevState.showCheckPassword,
    }));
  };

  const backloginscreen = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.samerow}>
        <Icon name="envelope" size={20} marginRight={10} />
        <TextInput
          style={styles.input}
          placeholder="Email (example@gmail.com)"
          value={formData.regemail}
          keyboardType="email-address"
          onChangeText={text => handleInputChange('regemail', text)}
        />
      </View>
      <View style={styles.samerow}>
        <Icon name="user" size={20} marginRight={10} />
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={formData.fullname}
          keyboardType="default"
          onChangeText={text => handleInputChange('fullname', text)}
        />
      </View>
      <View style={styles.samerow}>
        <Icon name="phone" size={20} marginRight={10} />
        <TextInput
          style={styles.input}
          placeholder="Your mobile phone (10 digits)"
          value={formData.phonenumber}
          keyboardType="number-pad"
          onChangeText={text => handleInputChange('phonenumber', text)}
        />
      </View>
      <View style={styles.samerow}>
        <Icon name="lock" size={20} marginRight={10} />
        <TextInput
          style={styles.input}
          placeholder="New password"
          value={formData.password}
          secureTextEntry={!formData.showPassword}
          onChangeText={text => handleInputChange('password', text)}
        />
        <Icon
          name={formData.showPassword ? 'eye' : 'eye-slash'}
          size={20}
          onPress={togglePasswordVisibility}
        />
      </View>
      <View style={styles.samerow}>
        <IconIoni name="lock-closed-outline" size={20} marginRight={10} />
        <TextInput
          style={styles.input}
          placeholder="Confirm your new password"
          value={formData.checkpassword}
          secureTextEntry={!formData.showCheckPassword}
          onChangeText={text => handleInputChange('checkpassword', text)}
        />
        <Icon
          name={formData.showCheckPassword ? 'eye' : 'eye-slash'}
          size={20}
          onPress={toggleCheckPasswordVisibility}
        />
      </View>
      <View style={styles.samerow}>
        <Text style={{marginStart: 0, marginTop: 5}}>
          {' '}
          By signing up, you're agree to our{' '}
        </Text>
        <Text style={colors.primary}> Terms & Conditions </Text>
        <Text> and </Text>
        <Text style={{color: colors.primary, marginStart: 5}}>
          Privacy Policy{' '}
        </Text>
      </View>
      <Button mode="contained" style={styles.button} onPress={handleSignUp}>
        Sign up
      </Button>
      <View style={styles.samerow}>
        <Text style={{marginStart: 12, marginTop: 5}}> Joined us before? </Text>
        <Text style={{color: '#00008B'}} onPress={backloginscreen}>
          {' '}
          Login{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.dark,
  },
  samerow: {
    flexWrap: 'wrap',
    marginStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    height: 45,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
    marginTop: 20,
  },
});

export default SignUp;
