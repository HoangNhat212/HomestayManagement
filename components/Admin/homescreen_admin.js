import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import image1 from '../../assets/images/hotel1.jpg';
import image2 from '../../assets/images/hotel2.jpg';
import image3 from '../../assets/images/hotel3.jpg';
import database from '@react-native-firebase/database';
const Homescreen_admin = ({navigation}) => {
  const [data, setData] = useState([]);
  database()
    .ref('/homestays')
    .on('value', data => {
      setData(data.val());
    });
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailHomeScreen_Admin', item)}>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleAddItem = () => {
    // Add a new item to the data array
    const newItem = {
      id: String(data.length + 1),
      name: `Item ${data.length + 1}`,
      image: image3,
    };

    setData([...data, newItem]);
  };

  return (
    <View style={styles.container}>
      {/* View containing Add button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
  },
  addButtonContainer: {
    alignItems: 'flex-end', // Đặt nút "Add" ở phía bên phải
    paddingRight: 20,
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Homescreen_admin;
