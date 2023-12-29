import React, {useState, useCallback, useEffect} from 'react';
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
import database from '@react-native-firebase/database';
const DetailHomeScreenAdmin = ({route, navigation}) => {
  const homestay = route.params;
  const [rooms, setRooms] = useState([]);
  const [roomtype, setRoomTypes] = useState([]);
  const [name, setName] = useState(homestay.name);
  const [location, setLocation] = useState(homestay.location);
  const [policy, setPolicy] = useState(homestay.policy);
  const [price, setPrice] = useState(homestay.price);
  const [province, setProvince] = useState(homestay.province);
  const [slogan, setSlogan] = useState(homestay.slogan);
  const [detail, setDetail] = useState(homestay.details);
  const [extensions, setExtensions] = useState({
    buffet: homestay.extension['Buffet'] == 1 ? true : false,
    carPark: homestay.extension['Car_park'] == 1 ? true : false,
    motorBike: homestay.extension['MotorBike'] == 1 ? true : false,
    wifi: homestay.extension['Wifi'] == 1 ? true : false,
  });

  const fetchRooms = useCallback(async () => {
    const snapshot = await database().ref('rooms').once('value');
    if (snapshot && snapshot.val) {
      const data = snapshot.val();
      const roomsData = Object.values(data);
      console.log(roomtype);
      // Tạo một đối tượng để phân loại các phòng theo roomtype_id
      const classifiedRooms = {};
      roomsData.forEach(room => {
        if (classifiedRooms.hasOwnProperty(room.roomtype_id)) {
          classifiedRooms[room.roomtype_id].push(room);
        } else {
          classifiedRooms[room.roomtype_id] = [room];
        }
      });
      const filterclassifiedRooms = Object.keys(classifiedRooms)
        .map(key => classifiedRooms[key])
        .flat()
        .filter(
          roomA =>
            roomtype &&
            roomtype.some(roomB => roomB.roomtype_id === roomA.roomtype_id),
        );
      const updatedRooms = filterclassifiedRooms;

      setRooms(updatedRooms);
    }
  }, [roomtype]);

  const fetchRoomTypes = useCallback(async () => {
    const snapshot = await database().ref('roomtypes').once('value');
    if (snapshot && snapshot.val) {
      const data = snapshot.val();
      const roomTypesData = Object.values(data);
      // Lọc các kiểu phòng theo homestay_id
      const filteredRoomTypes = roomTypesData.filter(
        roomType => roomType.homestay_id === homestay.homestay_id,
      );
      let updatedRoomTypes = filteredRoomTypes;
      await setRoomTypes(updatedRoomTypes);
    }
  }, [homestay.homestay_id]);
  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
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
  const listroomNav = async () => {
    navigation.navigate('RoomScreen_admin', {rooms, roomtype});
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
          value={price.toString()}
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
        <TouchableOpacity style={styles.listButton} onPress={listroomNav}>
          <Text style={{fontSize: 16, color: '#fff'}}>List Room</Text>
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
  listButton: {
    backgroundColor: 'green',
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

export default DetailHomeScreenAdmin;
