import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import {set} from 'date-fns';
const DetailHomeScreenAdmin = ({route, navigation}) => {
  const {item, provinces} = route.params;
  const homestay = item;
  const [rooms, setRooms] = useState([]);
  const [roomtype, setRoomTypes] = useState([]);
  const [name, setName] = useState(item.name);
  const [location, setLocation] = useState(item.location);
  const [province, setProvince] = useState(item.province);
  const [policy, setPolicy] = useState(item.policy);
  const [price, setPrice] = useState(item.price);
  const [slogan, setSlogan] = useState(item.slogan);
  const [detail, setDetail] = useState(item.details);
  const [extensions, setExtensions] = useState({
    buffet: item.extension['Buffet'] == 1 ? true : false,
    car_park: item.extension['Car_park'] == 1 ? true : false,
    motorBike: item.extension['MotorBike'] == 1 ? true : false,
    wifi: item.extension['Wifi'] == 1 ? true : false,
  });
  const [selectedType, setSelectedTypes] = useState({
    Travel: false,
    Luxury: false,
    Couple: false,
    Trending: false,
    'For sales': false,
  });
  const updateSelectedTypes = () => {
    const updatedSelectedType = {...selectedType};
    Object.keys(selectedType).forEach(type => {
      updatedSelectedType[type] = item.type.includes(type);
    });
    setSelectedTypes(updatedSelectedType);
  };
  useEffect(() => {
    updateSelectedTypes();
  }, [item.type]);

  const fetchRooms = useCallback(async () => {
    const snapshot = await database().ref('rooms').once('value');
    if (snapshot && snapshot.val) {
      const data = snapshot.val();
      const roomsData = Object.values(data);
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
      console.log('HAAAA', updatedRooms);
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
        roomType => roomType.homestay_id === item.homestay_id,
      );
      let updatedRoomTypes = filteredRoomTypes;
      console.log('HIIIII', updatedRoomTypes);
      await setRoomTypes(updatedRoomTypes);
    }
  }, [item.homestay_id]);

  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const convertObjectToArray = selectedType => {
    const selectedArray = Object.entries(selectedType)
      .filter(([key, value]) => value) // Filter only true values
      .map(([key]) => key); // Get keys of true values

    const hourlyOvernightArray = ['Hourly', 'Overnight'];

    return [...hourlyOvernightArray, ...selectedArray];
  };

  const handleSave = () => {
    let path = (item.homestay_id - 1).toString();
    const typesArray = convertObjectToArray(selectedType);
    const updatedExtensions = {
      Buffet: extensions.buffet ? 1 : 0,
      Car_park: extensions.car_park ? 1 : 0,
      MotorBike: extensions.motorBike ? 1 : 0,
      Wifi: extensions.wifi ? 1 : 0,
    };
    database()
      .ref('homestays/' + path)
      .update({
        name: name,
        location: location,
        policy: policy,
        price: price,
        province: province,
        slogan: slogan,
        details: detail,
        extension: updatedExtensions,
        type: typesArray,
      })
      .then(() => Alert.alert('Update successfully!'));
  };
  const listroomNav = async () => {
    navigation.navigate('RoomScreen_admin', {rooms, roomtype, homestay});
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
        <Text style={styles.label}>Homestay Types:</Text>
        {Object.keys(selectedType).map(type => (
          <View key={type} style={styles.checkboxContainer}>
            <CheckBox
              value={selectedType[type]}
              onValueChange={value =>
                setSelectedTypes({...selectedType, [type]: value})
              }
            />
            <Text style={styles.label}>{type}</Text>
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
