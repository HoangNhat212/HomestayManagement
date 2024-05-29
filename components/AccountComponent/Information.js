import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import {addYears, subYears} from 'date-fns';
import colors from '../../assets/consts/colors';
import firestore from '@react-native-firebase/firestore';
import {ModalPicker} from '../ModalPicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {de} from 'date-fns/locale';

function Information({route}) {
  const {email} = route.params;
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [gender, setgender] = useState('');
  const [dob, setdob] = useState('');
  const [password, setPassword] = useState('');
  const [accmail, setaccmail] = useState('');
  const currentDate = new Date();
  const maximumDate = subYears(currentDate, 18);
  const [chooseData, setchooseData] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSecure, setIsSecure] = useState(true);

  const [keys, setKeys] = useState({public_key: {}, private_key: {}});

  const generateKeys = async () => {
    try {
      const response = await axios.get(
        'http://192.168.110.67:5000/generate_keys',
      );
      setKeys(response.data);
      return response.data;
    } catch (error) {
      console.info(error);
      console.error('Error generating keys', error);
    }
  };

  const encryptMessage = async ({message, keysnew}) => {
    try {
      const response = await axios.post('http://192.168.110.67:5000/encrypt', {
        message,
        e: keysnew.e,
        n: keysnew.n,
      });
      return await response.data.encrypted_message;
    } catch (error) {
      console.error('Error encrypting message', error);
    }
  };

  const decryptMessage = async message => {
    var string_private_key = await AsyncStorage.getItem('private_key');
    console.log('string_private_key', string_private_key);
    const private_key = JSON.parse(string_private_key);
    console.log('private_key', private_key);
    try {
      const response = await axios.post('http://192.168.110.67:5000/decrypt', {
        encrypted_message: message,
        da: private_key.da,
        db: private_key.db,
        p: private_key.p,
        q: private_key.q,
      });
      return response.data.decrypted_message;
    } catch (error) {
      console.error('Error decrypting message', error);
    }
  };

  const setData = option => {
    setchooseData(option);
  };
  const toggleSecureEntry = () => {
    setIsSecure(prev => !prev);
  };
  const changeModalVisibility = bool => {
    setisModalVisible(bool);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    date = dayjs(date).format('DD/MM/YYYY');
    setSelectedDate(date.toString());
    hideDatePicker();
  };

  useEffect(() => {
    checkInfo();
  }, []);

  const handleUpdateData = async () => {
    try {
      const updatedGender = chooseData;
      const mail = await AsyncStorage.getItem('EmailAccount');
      const checkservice = await AsyncStorage.getItem('isLoggedService');

      // Generate keys
      var keys_new = await generateKeys();

      // Store private key
      await AsyncStorage.setItem(
        'private_key',
        JSON.stringify(keys_new.private_key),
      );

      const a = await AsyncStorage.getItem('private_key');

      // Encrypt name
      const encrypt_name = await encryptMessage({
        message: name,
        keysnew: keys_new.public_key,
      });

      // Fetch user data
      const querySnapshot = await firestore()
        .collection('Users')
        .where('email', '==', mail)
        .get();

      if (querySnapshot.docs.length > 0) {
        const documentRef = querySnapshot.docs[0].ref;

        // Update user data
        await documentRef.update({
          gender: updatedGender || gender,
          name: encrypt_name,
          phone: phone,
          date_of_birth: selectedDate || dob,
          password: password,
        });

        console.log('Update successful');
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const checkInfo = async () => {
    const mail = await AsyncStorage.getItem('EmailAccount');
    const checkservice = await AsyncStorage.getItem('isLoggedService');
    let name = '';
    if (checkservice == 'true') {
      name = await AsyncStorage.getItem('Emailname');
      setname(name);
      setaccmail(mail);
    } else {
      firestore()
        .collection('Users')
        .where('email', '==', mail)
        .get()
        .then(async querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            if (querySnapshot.docs[0]._data.email === mail) {
              let decrpt_name = await decryptMessage(
                querySnapshot.docs[0]._data.name,
              );
              setname(decrpt_name);
              setphone(querySnapshot.docs[0]._data.phone);
              setgender(querySnapshot.docs[0]._data.gender);
              setdob(querySnapshot.docs[0]._data.date_of_birth);
              setPassword(querySnapshot.docs[0]._data.password);
              setaccmail(mail);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.item}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            keyboardType="default"
            onChangeText={text => setname(text)}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            keyboardType="default"
            onChangeText={text => setphone(text)}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.mailinput}>{accmail}</Text>
        </View>
        <Text style={styles.title}>Personal</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => changeModalVisibility(true)}>
            <Text style={styles.input}>
              {chooseData === '' ? gender : chooseData}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}>
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
              />
            </Modal>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Date of birth</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.input}>{selectedDate || dob}</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              maximumDate={maximumDate}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            keyboardType="default"
            secureTextEntry={isSecure}
            onChangeText={text => setPassword(text)}
          />
          <Icon
            onPress={toggleSecureEntry}
            size={20}
            name={isSecure ? 'eye-slash' : 'eye'}
          />
        </View>
        <TouchableOpacity style={styles.touch} onPress={handleUpdateData}>
          <Text style={styles.touchText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Information;

const styles = StyleSheet.create({
  item: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 30,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.gray,
  },
  label: {
    width: '40%',
    fontSize: 20,
    color: colors.darkgray,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 20,
    color: colors.black,
  },
  mailinput: {
    width: '60%',
    backgroundColor: 'transparent',
    fontSize: 20,
    color: colors.gray,
  },
  title: {
    fontSize: 30,
    paddingTop: 30,
    marginLeft: 20,
    color: colors.black,
    fontFamily: 'Merriweather-Bold',
  },
  touch: {
    bottom: 10,
    width: '90%',
    height: '6%',
    borderRadius: 25,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.dark,
  },
  touchText: {
    fontSize: 20,
    color: colors.white,
  },
});
