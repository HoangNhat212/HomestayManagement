import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
const Roomscreen_admin = ({route, navigation}) => {
  const {
    rooms: initialRooms,
    roomtype: initialRoomType,
    homestay,
  } = route.params;
  const [rooms, setRooms] = useState([]);
  const [roomtype, setRoomTypes] = useState([]);

  const fetchRooms = useCallback(async () => {
    const snapshot = await database().ref('rooms').once('value');
    if (snapshot && snapshot.val) {
      const data = snapshot.val();
      const roomsData = Object.values(data);
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
            roomtype.some(roomB => roomB.roomtype_id == roomA.roomtype_id),
        );
      const updatedRooms = filterclassifiedRooms;
      setRooms(updatedRooms);
      console.log('hiii', updatedRooms);
    }
  }, [roomtype]);

  const fetchRoomTypes = useCallback(async () => {
    const snapshot = await database().ref('roomtypes').once('value');
    if (snapshot && snapshot.val) {
      const data = snapshot.val();
      const roomTypesData = Object.values(data);
      const filteredRoomTypes = roomTypesData.filter(
        roomType => roomType.homestay_id == homestay.homestay_id,
      );

      await setRoomTypes(filteredRoomTypes);
    }
  }, [homestay.homestay_id]);

  useEffect(() => {
    fetchRooms();
  }, [roomtype]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await fetchRoomTypes();
      };

      fetchData();
    }, []),
  );
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
          onPress={() =>
            navigation.navigate('RoomType_admin', {roomtype, homestay})
          }>
          <Text style={styles.buttonText}>RoomType</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddRoom_admin', {homestay})}>
          <Text style={styles.buttonText}>AddRoom</Text>
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
    flexDirection: 'row', // Sắp xếp các phần tử con theo chiều ngang
    justifyContent: 'space-around', // Các phần tử con được căn cách đều ra hai phía
    paddingHorizontal: 10, // Thêm khoảng trắng ở hai đầu
    marginTop: 20,
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
