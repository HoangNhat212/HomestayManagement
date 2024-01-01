import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'uuid-random';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {id} from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';
const AddScreen_admin = ({navigation}) => {
  const provinces = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'An Giang',
    'Bà Rịa-Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên-Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
  ];
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [policy, setPolicy] = useState();
  const [price, setPrice] = useState();
  const [province, setProvince] = useState(provinces[0]);
  const [slogan, setSlogan] = useState();
  const [detail, setDetail] = useState();
  const [extensions, setExtensions] = useState({
    Buffet: false,
    Car_Park: false,
    MotorBike: false,
    Wifi: false,
  });
  const [selectedType, setSelectedTypes] = useState({
    Travel: false,
    Luxury: false,
    Couple: false,
    Trending: false,
    'For sales': false,
  });
  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const processExtensions = extensions => {
    let processedExtensions = {};
    for (let key in extensions) {
      processedExtensions[key] = extensions[key] ? 1 : 0;
    }
    return processedExtensions;
  };
  const newHomestay = {
    homestay_id: null,
    name: name,
    location: location,
    policy: policy,
    price: price,
    province: province,
    slogan: slogan,
    details: detail,
    extension: processExtensions(extensions),
    type: '',
    distance: '',
    rating: '4.0',
    ratingvote: '100',
    image: image,
    coordinates: coordinates,
  };
  const handleSetCoordinates = (latitude, longitude) => {
    setCoordinates({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
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
        setImage(uri);
      }
    });
  };

  const handleSave = async () => {
    // Đoạn mã để xử lý khi người dùng lưu thông tin
    let id = uuid();
    const storageRef = storage().ref(`vouchers/${id}`);
    // Convert your image file to a Blob
    const response = await fetch(image);
    const imageBlob = await response.blob();
    // Upload the image to Firebase Storage
    await storageRef.put(imageBlob);
    const imageUrl = await storageRef.getDownloadURL();
    let count = (await database().ref('homestays').once('value')).numChildren();
    let type = {0: 'Hourly', 1: 'Overnight'};
    let index = 2;
    Object.entries(selectedType).forEach(([key, value]) => {
      if (value && key !== 'Hourly' && key !== 'Overnight') {
        type[index++] = key;
      }
    });
    let idhomestay = count + 1;
    const processedData = {
      ...newHomestay,
      type: type,
      price: parseInt(price),
      image: imageUrl,
      homestay_id: idhomestay,
      coordinates: {
        latitude: parseFloat(coordinates.latitude),
        longitude: parseFloat(coordinates.longitude),
      },
    };
    const userDocument = database()
      .ref('homestays/' + count)
      .set(processedData)
      .then(() => {
        console.log('Data set.');
        Alert.alert('Success', 'Add homestay successfully');
        firestore()
          .collection('AccountHomestay')
          .add({
            email: name + '@stelio',
            password: '123',
            homestay_id: idhomestay,
          });
        navigation.goBack();
      });

    // Thêm các logic xử lý lưu dữ liệu vào cơ sở dữ liệu nếu cần
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        {newHomestay.image && (
          <Image source={{uri: image}} style={{width: 200, height: 200}} />
        )}
        <Button title="Choose Image" onPress={handleChooseImage} />
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter name"
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={text => setLocation(text)}
          placeholder="Enter location"
        />
        <TextInput
          placeholder="Latitude"
          value={coordinates.latitude}
          onChangeText={latitude => setCoordinates({...coordinates, latitude})}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Longitude"
          value={coordinates.longitude}
          onChangeText={longitude =>
            setCoordinates({...coordinates, longitude})
          }
          keyboardType="numeric"
        />

        <Text style={styles.label}>Policy:</Text>
        <TextInput
          style={styles.input}
          value={policy}
          onChangeText={text => setPolicy(text)}
          placeholder="Enter policy"
        />

        <Text style={styles.label}>Price ($):</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={text => setPrice(text)}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Province:</Text>
        <Picker
          style={styles.input}
          selectedValue={province}
          onValueChange={value => setProvince(value)}>
          {provinces.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>

        <Text style={styles.detail}>Slogan:</Text>
        <TextInput
          style={styles.input}
          value={slogan}
          onChangeText={text => setSlogan(text)}
          placeholder="Enter slogan"
        />

        <Text style={styles.label}>Detail:</Text>
        <TextInput
          style={styles.inputDetail}
          value={detail}
          onChangeText={text => setDetail(text)}
          placeholder="Enter detail"
          multiline
        />

        <Text style={styles.label}>Extensions:</Text>
        {Object.keys(extensions).map(key => (
          <View key={key} style={styles.checkboxContainer}>
            <CheckBox
              value={extensions[key]}
              onValueChange={value =>
                setExtensions({...extensions, [key]: value})
              }
            />
            <Text style={styles.label}>{key}</Text>
          </View>
        ))}

        <Text style={styles.label}>Type:</Text>
        {Object.keys(selectedType).map(key => (
          <View key={key} style={styles.checkboxContainer}>
            <CheckBox
              value={selectedType[key]}
              onValueChange={value =>
                setSelectedTypes({...selectedType, [key]: value})
              }
            />
            <Text style={styles.label}>{key}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputdetail: {
    height: 70,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 16,
    padding: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default AddScreen_admin;
