// EditRoomType.js

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
const AddRoomType_admin = ({route, navigation}) => {
  const homestay = route.params;
  const [name, setName] = useState();
  const [priceHour, setPriceHour] = useState();
  const [priceDay, setPriceDay] = useState();
  const [condition, setCondition] = useState({
    0: null,
    1: null,
    2: null,
  });
  const [capacity, setCapacity] = useState();
  const roomtype = {
    capacity: capacity,
    condition: condition,
    homestay_id: parseInt(homestay.homestay_id),
    price_per_hour: priceHour,
    price_per_night: priceDay,
    provision: {
      0: 'Thanh toán tại khách sạn',
      1: 'Nhận thưởng lên đến 1.080 điểm',
    },
    room_type: name,
    roomtype_id: null,
    timetype: {
      0: 'Hourly',
      1: 'Overnight',
    },
  };

  const handleSaveChanges = async () => {
    const ref = database().ref('roomtypes');
    let numberroom = await ref.once('value');
    let count = numberroom.numChildren();
    const datasave = {
      ...roomtype,
      capacity: parseInt(capacity),
      roomtype_id: parseInt(count + 1),
      price_per_night: parseInt(priceDay),
      price_per_hour: parseInt(priceHour),
    };
    database()
      .ref('roomtypes/' + count)
      .set(datasave)
      .then(() => {
        setTimeout(() => {
          navigation.goBack();
          console.log('Data set.');
        }, 2000);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Room Type</Text>
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

export default AddRoomType_admin;
