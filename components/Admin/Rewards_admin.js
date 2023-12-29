import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import database from '@react-native-firebase/database';
const Rewards_admin = ({navigation}) => {
  const [data, setData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchData = () => {
        database()
          .ref('/voucher')
          .on('value', snapshot => {
            setData(snapshot.val());
          });
      };

      fetchData(); // Call the fetchData function when the screen gains focus

      // Cleanup function (unsubscribe from the event)
      return () => {
        database().ref('/voucher').off('value');
      };
    }, []),
  );
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailVoucher_admin', item)}>
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
          onPress={() => navigation.navigate('AddVoucher_admin')}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

export default Rewards_admin;

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
