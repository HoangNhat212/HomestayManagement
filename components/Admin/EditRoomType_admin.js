// EditRoomType.js

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import {ro} from 'date-fns/locale';
const EditRoomType_admin = ({route, navigation}) => {
  const roomData = route.params;
  const [name, setName] = useState(roomData.room_type);
  const [priceHour, setPriceHour] = useState(
    roomData.price_per_hour ? roomData.price_per_hour.toString() : '',
  );
  const [priceDay, setPriceDay] = useState(
    roomData.price_per_night ? roomData.price_per_night.toString() : '',
  );
  const [condition, setCondition] = useState({
    0: roomData.condition[0],
    1: roomData.condition[1],
    2: roomData.condition[2],
  });
  const [capacity, setCapacity] = useState(
    roomData.capacity ? roomData.capacity.toString() : '',
  );
  const roomtype = {
    capacity: capacity,
    condition: condition,
    homestay_id: roomData.homestay_id,
    price_per_hour: priceHour,
    price_per_night: priceDay,
    provision: {
      0: 'Thanh toán tại khách sạn',
      1: 'Nhận thưởng lên đến 1.080 điểm',
    },
    room_type: name,
    roomtype_id: roomData.roomtype_id,
    timetype: {
      0: 'Hourly',
      1: 'Overnight',
    },
  };

  const handleSaveChanges = async () => {
    const ref = database().ref('roomtypes');
    let count = parseInt(roomData.roomtype_id) - 1;
    const datasave = {
      ...roomtype,
      capacity: parseInt(capacity),
      roomtype_id: parseInt(roomData.roomtype_id),
      price_per_night: parseInt(priceDay),
      price_per_hour: parseInt(priceHour),
    };
    database()
      .ref('roomtypes/' + count)
      .update(datasave)
      .then(() => {
        setTimeout(() => {
          navigation.goBack();
          console.log('Data set.');
        }, 2000);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Room Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Hour"
        value={priceHour}
        onChangeText={text => setPriceHour(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Day"
        value={priceDay}
        onChangeText={text => setPriceDay(text)}
      />
      <Text style={{fontSize: 16, fontWeight: '300'}}> Condition </Text>

      <TextInput
        placeholder="Number of beds"
        value={condition[0]}
        onChangeText={text => setCondition([text, condition[1], condition[2]])}
      />
      <TextInput
        placeholder="the size of the room"
        value={condition[1]}
        onChangeText={text => setCondition([condition[0], text, condition[2]])}
      />
      <TextInput
        placeholder="Window/No window"
        value={condition[2]}
        onChangeText={text => setCondition([condition[0], condition[1], text])}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity"
        value={capacity}
        onChangeText={text => setCapacity(text)}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default EditRoomType_admin;
