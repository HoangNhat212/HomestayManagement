import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';
import database from '@react-native-firebase/database';
const DetailVoucher_admin = ({route, navigation}) => {
  const [voucherData, setVoucherData] = useState(route.params);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState('');
  useEffect(() => console.log(voucherData), []);
  const showDatePicker = field => {
    setSelectedDateField(field);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleChooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const responseObject =
          typeof response === 'string' ? JSON.parse(response) : response;
        let uri = responseObject.assets[0].uri;
        setVoucherData(prevState => ({...prevState, image: uri}));
      }
    });
  };

  const handleDateConfirm = date => {
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    setVoucherData({...voucherData, date_start: formattedDate});
    // Check if the selected date is for date_start or date_end
    if (selectedDateField === 'date_start') {
      setVoucherData({...voucherData, date_start: formattedDate});

      // Ensure that date_end is always greater than date_start
      const dateEnd = new Date(voucherData.date_end);
      if (selectedDate > dateEnd) {
        Alert.alert('Please fill date_end greater than date_start');
      }
    } else if (selectedDateField === 'date_end') {
      // If the selected date is for date_end, update date_end
      setVoucherData({...voucherData, date_end: formattedDate});

      // Ensure that date_end is always greater than date_start
      const dateStart = new Date(voucherData.date_start);
      if (selectedDate < dateStart) {
        Alert.alert('Please fill date_start less than date_end');
      }
    }

    hideDatePicker();
  };

  const handleSaveVoucher = async () => {
    try {
      // Create a reference to the file location
      let id = uuid();
      const storageRef = storage().ref(`vouchers/${id}`);
      // Convert your image file to a Blob
      const response = await fetch(voucherData.image);
      const imageBlob = await response.blob();

      // Upload the image to Firebase Storage
      const snapshot = await storageRef.put(imageBlob);
      const vouchersRef = database().ref('voucher');
      const vouch = await vouchersRef.once('value');
      const voucherCount = vouch.numChildren();

      // Determine the next index for the new voucher
      const newIndex = voucherData.id;
      // Get the download URL of the image
      const imageUrl = await storageRef.getDownloadURL();
      // Create a reference to the database location
      let path = 'voucher/' + (newIndex - 1).toString();
      const dbRef = database().ref(path);
      console.log(dbRef);
      // Prepare the voucher data
      const dataToSave = {
        ...voucherData,
        id: newIndex,
        image: imageUrl.toString(),
        value: parseFloat(voucherData.value), // Parse value as float
        quantity: parseInt(voucherData.quantity, 10), // Parse quantity as integer
      };
      dbRef.update(dataToSave).then(() => {
        console.log('Voucher saved successfully!');
      });
      // Save the voucher data to Firebase Realtime Database
    } catch (error) {
      console.error('Error saving voucher:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Voucher</Text>

      {/* Code Input */}
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={voucherData.code}
        onChangeText={text => setVoucherData({...voucherData, code: text})}
      />

      {/* Date picker for date_start */}
      <TextInput
        style={styles.input}
        placeholder="Select start date"
        value={voucherData.date_start}
        onFocus={() => showDatePicker('date_start')}
      />

      {/* Date picker for date_end */}
      <TextInput
        style={styles.input}
        placeholder="Select end date"
        value={voucherData.date_end}
        onFocus={() => showDatePicker('date_end')}
      />

      {/* Details Input */}
      <TextInput
        style={styles.input}
        placeholder="Details"
        value={voucherData.details}
        onChangeText={text => setVoucherData({...voucherData, details: text})}
      />

      <Button title="Choose Image" onPress={handleChooseImage} />

      {voucherData.image && (
        <Image source={{uri: voucherData.image}} style={styles.imagePreview} />
      )}

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={voucherData.name}
        onChangeText={text => setVoucherData({...voucherData, name: text})}
      />

      {/* Notice Input */}
      <TextInput
        style={styles.input}
        placeholder="Notice"
        value={voucherData.notice}
        onChangeText={text => setVoucherData({...voucherData, notice: text})}
      />

      {/* Quantity Input */}
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={voucherData.quantity.toString()}
        onChangeText={text => setVoucherData({...voucherData, quantity: text})}
      />

      {/* Sale Off Input */}
      <TextInput
        style={styles.input}
        placeholder="Sale Off"
        value={voucherData.sale_off}
        onChangeText={text => setVoucherData({...voucherData, sale_off: text})}
      />

      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={voucherData.title}
        onChangeText={text => setVoucherData({...voucherData, title: text})}
      />

      {/* Value Input */}
      <TextInput
        style={styles.input}
        placeholder="Value"
        keyboardType="numeric"
        value={voucherData.value.toString()}
        onChangeText={text => setVoucherData({...voucherData, value: text})}
      />

      {/* Save Button */}
      <Button
        style={styles.button}
        title="Save Voucher"
        onPress={handleSaveVoucher}
      />

      {/* Image preview */}

      {/* Date picker modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 16,
  },
  button: {
    alignSelf: 'center',
    width: 100,
    marginBottom: 10,
  },
});

export default DetailVoucher_admin;
