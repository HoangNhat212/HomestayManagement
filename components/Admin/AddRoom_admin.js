import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
const AddRoom_admin = ({route, navigation}) => {
  const {homestay} = route.params;
  const [roomtype, setRoomTypes] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const fetchRoomTypes = async () => {
    try {
      const snapshot = await database().ref('roomtypes').once('value');
      if (snapshot && snapshot.val) {
        const data = snapshot.val();
        const roomTypesData = Object.values(data);
        const filteredRoomTypes = roomTypesData.filter(
          roomType => roomType.homestay_id == homestay.homestay_id,
        );
        setRoomTypes(filteredRoomTypes);
        console.log(filteredRoomTypes);
      }
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  };

  // useFocusEffect will be called every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused, calling fetchRoomTypes');
      fetchRoomTypes();
      return () => setRoomTypes([]);
    }, []),
  );
  const handleAddRoom = () => {
    // Lấy roomtype_id tương ứng với room_type được chọn
    const selectedRoomTypeId = roomtype.find(
      item => item.room_type === selectedRoomType,
    )?.roomtype_id;
    database()
      .ref('rooms')
      .once('value')
      .then(snapshot => {
        let count = snapshot.numChildren();

        database()
          .ref('rooms/' + count)
          .set({
            room_id: count + 1,
            room_number: roomNumber,
            roomtype_id: selectedRoomTypeId,
          })
          .then(() => {
            setTimeout(() => {
              navigation.goBack();
              console.log('Data set.');
            }, 2000);
          });
      });
  };

  return (
    <View style={styles.container}>
      <Text>Room Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setRoomNumber(text)}
        value={roomNumber}
        keyboardType="numeric"
      />

      <Text>Select Room Type:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedRoomType}
        onValueChange={itemValue => setSelectedRoomType(itemValue)}>
        <Picker.Item label="Select Room Type" value="" />
        {roomtype.map((type, index) => (
          <Picker.Item
            key={index}
            label={type.room_type}
            value={type.room_type}
          />
        ))}
      </Picker>
      <Button title="Add" onPress={handleAddRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default AddRoom_admin;
