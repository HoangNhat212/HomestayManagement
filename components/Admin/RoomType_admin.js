import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const RoomType_admin = ({route, navigation}) => {
  const roomtype = route.params;

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditRoomType_admin', item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.room_type}</Text>
        <Text>{item.price_per_hour + '/hour'}</Text>
        <Text>{item.price_per_night + '/day'}</Text>
        <Text>Condition:</Text>
        <View style={styles.conditionContainer}>
          {item.condition.map((condition, index) => (
            <Text key={index}>{condition + ' '}</Text>
          ))}
        </View>
        <Text>{item.capacity + ' people'}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddRoomPress = () => {
    navigation.navigate('AddRoomType_admin');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Types</Text>
      <FlatList
        data={roomtype}
        renderItem={renderItem}
        keyExtractor={item => item.roomtype_id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddRoomPress}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
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
    color: 'blue',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  conditionContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RoomType_admin;
