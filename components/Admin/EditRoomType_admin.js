// EditRoomType.js

import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

const EditRoomType_admin = ({route}) => {
  const roomData = route.params;
  const [name, setName] = useState(roomData.room_type);
  const [priceHour, setPriceHour] = useState(roomData.price_per_hour);
  const [priceDay, setPriceDay] = useState(roomData.price_per_night);
  const [condition, setCondition] = useState(
    roomData.condition ? roomData.condition.join(', ') : '',
  );
  const [capacity, setCapacity] = useState(roomData.capacity);

  const handleSaveChanges = () => {
    console.log(roomData);
  };

  return (
    <View style={styles.container}>
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
        value={priceHour.toString()}
        onChangeText={text => setPriceHour(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Day"
        value={priceDay.toString()}
        onChangeText={text => setPriceDay(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Condition (comma-separated)"
        value={condition}
        onChangeText={text => setCondition(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity"
        value={capacity.toString()}
        onChangeText={text => setCapacity(text)}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
