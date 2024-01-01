import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';

const Homescreen_admin = ({navigation}) => {
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    database()
      .ref('/homestays')
      .on('value', snapshot => {
        setData(snapshot.val());
      });
  }, []);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const snapshot = await database().ref('provinces').once('value');
        const provincesData = snapshot.val() || {};

        // Convert the provincesData object to an array
        const provincesArray = Object.values(provincesData);

        // Chọn thuộc tính 'name' từ mỗi đối tượng
        const provinceNames = provincesArray.map(province => province.name);
        setProvinces(provinceNames);
        console.log(provinceNames);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailHomeScreen_Admin', {item, provinces})
        }>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddScreen_Admin')}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.homestay_id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    marginBottom: 80,
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
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    width: 80,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Homescreen_admin;
