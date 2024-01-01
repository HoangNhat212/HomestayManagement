import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CardList from './CardList';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const HomeScreen_homeuser = ({route, navigation}) => {
  const {homeid} = route.params;
  const [bookingData, setBookingData] = useState([]);
  const [filterOption, setFilterOption] = useState('all'); // 'all' or 'current'

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    try {
      let query = firestore()
        .collection('Booking')
        .where('homestay_id', '==', homeid);

      // Apply date filter based on the selected option
      if (filterOption === 'current') {
        const currentDate = moment().startOf('day');
        query = query.where('check_in', '>=', currentDate.toDate());
      }

      const querySnapshot = await query.get();

      // Extract data from the query snapshot
      const data = querySnapshot.docs.map(doc => doc.data());

      // Update state with the fetched data
      setBookingData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterPress = option => {
    setFilterOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterOption === 'all' && styles.activeFilter,
          ]}
          onPress={() => handleFilterPress('all')}>
          <Text style={styles.filterButtonText}>All Days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterOption === 'current' && styles.activeFilter,
          ]}
          onPress={() => handleFilterPress('current')}>
          <Text style={styles.filterButtonText}>Current Day</Text>
        </TouchableOpacity>
      </View>
      <CardList data={bookingData} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilter: {
    backgroundColor: '#eee',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen_homeuser;
