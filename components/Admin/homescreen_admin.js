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

const Homescreen_admin = () => {
  const [data, setData] = useState([
    {id: '1', name: 'Item 1', image: image1},
    {id: '2', name: 'Item 2', image: image2},
    // Add more items as needed
  ]);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

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
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
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
