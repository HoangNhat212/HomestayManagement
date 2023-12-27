import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  launchImageLibrary,
  uploadImageToServer,
} from 'react-native-image-picker';

const AddVoucher_admin = () => {
  const [voucherData, setVoucherData] = useState({
    code: '',
    date_end: '',
    date_start: '',
    details: '',
    id: '',
    image: '',
    name: '',
    notice: '',
    quantity: 1,
    sale_off: '',
    title: '',
    value: 0,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState('');
  const [image, setImage] = useState(null);

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
        setImage(response.uri);
        const responseObject =
          typeof response === 'string' ? JSON.parse(response) : response;
        let uri = responseObject.assets[0].uri;
        console.log(uri);
        setImage(uri);
        // const source = {uri: response.uri};
        // uploadImageToServer(source.uri);
      }
    });
  };

  const handleDateConfirm = date => {
    setVoucherData({...voucherData, [selectedDateField]: date.toISOString()});
    hideDatePicker();
  };

  //   const handleSaveVoucher = async () => {
  //     try {
  //       // Upload image to Firebase Storage
  //       const imageResponse = await fetch(image);
  //       const imageBlob = await imageResponse.blob();
  //       const storageRef = firebase.storage().ref().child(`voucher_images/${voucherData.code}`);
  //       await storageRef.put(imageBlob);

  //       // Get the download URL of the uploaded image
  //       const imageUrl = await storageRef.getDownloadURL();

  //       // Update the voucher data with the image URL
  //       setVoucherData({ ...voucherData, imageUrl });

  //       // Now you can save the voucher data to the database (e.g., Realtime Database)
  //       // Replace the following line with your actual database saving logic
  //       await firebase.database().ref('vouchers').push(voucherData);

  //       console.log('Voucher saved successfully!');
  //     } catch (error) {
  //       console.error('Error saving voucher:', error);
  //     }
  //   };
  const handleSaveVoucher = () => {
    // Implement saving data to the database here
    console.log('Saving voucher:', voucherData);
  };

  return (
    <View style={styles.container}>
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

      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
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
        onChangeText={text =>
          setVoucherData({...voucherData, quantity: parseInt(text) || 0})
        }
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
        onChangeText={text =>
          setVoucherData({...voucherData, value: parseFloat(text) || 0})
        }
      />

      {/* Save Button */}
      <Button title="Save Voucher" onPress={handleSaveVoucher} />

      {/* Image preview */}
      {voucherData.image && (
        <Image source={{uri: image}} style={styles.imagePreview} />
      )}

      {/* Date picker modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});

export default AddVoucher_admin;
