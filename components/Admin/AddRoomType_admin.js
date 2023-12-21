// EditRoomType.js

import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

const AddRoomType_admin = () => {
  const [name, setName] = useState();
  const [priceHour, setPriceHour] = useState();
  const [priceDay, setPriceDay] = useState();
  const [condition, setCondition] = useState();
  const [capacity, setCapacity] = useState();

  const handleSaveChanges = () => {
    console.log();
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
        value={priceHour}
        onChangeText={text => setPriceHour(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Day"
        value={priceDay}
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
        value={capacity}
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

export default AddRoomType_admin;
