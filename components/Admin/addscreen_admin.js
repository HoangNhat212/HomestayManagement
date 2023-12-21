import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const AddScreen_admin = () => {
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [policy, setPolicy] = useState();
  const [price, setPrice] = useState();
  const [province, setProvince] = useState();
  const [slogan, setSlogan] = useState();
  const [detail, setDetail] = useState();
  const [extensions, setExtensions] = useState({
    buffet: false,
    carPark: false,
    motorBike: false,
    wifi: false,
  });
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
  const handleSave = () => {
    // Đoạn mã để xử lý khi người dùng lưu thông tin
    console.log('Name:', name);
    console.log('Location:', location);
    console.log('Policy:', policy);
    console.log('Price:', price);
    console.log('Province:', province);
    console.log('Slogan:', slogan);
    console.log('Detail:', detail);
    console.log('Extensions:', extensions);
    // Thêm các logic xử lý lưu dữ liệu vào cơ sở dữ liệu nếu cần
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
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
