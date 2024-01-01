import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Input,
  Alert,
} from 'react-native';
import images from '../../assets/images';
import colors from '../../assets/consts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {el} from 'date-fns/locale';
import {authorize} from 'react-native-app-auth';
import axios from 'axios';
import {KEY} from '@env';
import CryptoJS from 'react-native-crypto-js';
function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const config = {
    issuer: 'https://accounts.google.com',
    clientId:
      '690014602360-fblqp9s87rh31lsbn7oqmako3jfkcrgv.apps.googleusercontent.com',
    redirectUrl: 'com.example.stelio:/oauth2callback',
    scopes: ['openid', 'profile', 'email'],
  };

  const handelGoogleLogin = async () => {
    try {
      const result = await authorize(config);
      console.log('authorized', result);
      const userinfo = await getUserInfo(result.accessToken);
      const userid = userinfo.id;
      console.log(userinfo);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userId', userid);
      await AsyncStorage.setItem('EmailAccount', userinfo.email);
      await AsyncStorage.setItem('Emailname', userinfo.name);
      await AsyncStorage.setItem('isLoggedService', 'true');
      await firestore().collection('Users').doc(userid).set({
        name: userinfo.name,
        email: userinfo.email,
        phone: '',
        permission: 1,
        password: '',
        gender: '',
        date_of_birth: '',
      });
      navigation.navigate('BottomTabsNavigator', {email, userid});
    } catch (e) {
      throw new Error(e);
    }
  };

  const getUserInfo = async accessToken => {
    try {
      // Gửi yêu cầu GET đến Google API UserInfo
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // Dữ liệu người dùng sẽ nằm trong response.data
      const userData = response.data;

      console.log('Thông tin người dùng từ Google:', userData);
      return userData;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng từ Google:', error);
      throw error;
    }
  };

  const checkLoggedInStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    const storedUserId = await AsyncStorage.getItem('userId');
    if (isLoggedIn && storedUserId) {
      navigation.navigate('BottomTabsNavigator', {
        email,
        userId: storedUserId,
      });
    }
  };
  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLogin = () => {
    if (email == 'admin' && password == '123') {
      loginAd();
    } else if (/@stelio/.test(email)) {
      firestore()
        .collection('AccountHomestay')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();
            let homeid = user.homestay_id;
            let deencrypt = CryptoJS.AES.decrypt(user.password, KEY).toString();
            if (deencrypt === password) {
              navigation.navigate('BottomTabsNavigator_HomeStayAccount', {
                homeid,
              });
            } else {
              alert('Wrong password');
            }
          } else {
            alert('Account not found');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      firestore()
        .collection('Users')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();
            if (user.password === password) {
              login();
            } else {
              alert('Wrong password');
            }
          } else {
            alert('Account not found');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const login = async () => {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      const userId = user.uid;
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('isLoggedService', 'false');
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('EmailAccount', email);
      navigation.navigate('BottomTabsNavigator', {email, userId});
    } catch (error) {
      alert('Login failed');
    }
  };

  const loginAd = async () => {
    navigation.navigate('BottomTabsNavigator_Admin');
  };

  const toggleSecureEntry = () => {
    setIsSecure(prev => !prev);
  };

  const SignUp = () => {
    navigation.navigate('SignUp');
  };
  const forgotPasswordButton = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <LinearGradient style={styles.container} colors={['#00204A', '#005792']}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Welcome back! You've been missed.</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={22} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={isSecure}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Icon
            onPress={toggleSecureEntry}
            size={20}
            name={isSecure ? 'eye-slash' : 'eye'}
          />
        </View>
        <TouchableOpacity
          onPress={() => forgotPasswordButton()}
          style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={checkLogin}
          loading={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handelGoogleLogin()}>
            <Icon name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Alert.alert('Login with Facebook')}>
            <Icon name="facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Not a member?</Text>
          <Text
            style={[styles.registerText, styles.registerLink]}
            onPress={SignUp}>
            Register Now
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  safeArea: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -35,
  },
  logo: {
    height: 170,
    width: 170,
    marginRight: -10,
  },
  title: {
    fontSize: 20,
    color: '#878787',
    fontWeight: '300',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 13,
  },
  loginButton: {
    height: 45,
    width: 290,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
  orText: {
    color: 'black',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,
  },
  socialButton: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 30,
  },
  registerText: {
    color: '#9a9a9a',
    fontSize: 13,
    marginRight: 5,
  },
  registerLink: {
    color: colors.primary,
  },
});
export default Login;
