import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const Roomscreen_admin = ({route, navigation}) => {
  const {rooms, roomtype} = route.params;

  // Hàm để lấy room_type từ roomtype_id
  const getRoomType = roomtype_id => {
    const foundRoomType = roomtype.find(
      item => item.roomtype_id === roomtype_id,
    );
    return foundRoomType ? foundRoomType.room_type : 'Unknown';
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nameA}>{item.room_number}</Text>
      <Text style={styles.nameB}>{getRoomType(item.roomtype_id)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RoomType_admin', roomtype)}>
          <Text style={styles.buttonText}>RoomType</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  nameA: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  nameB: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Roomscreen_admin;
