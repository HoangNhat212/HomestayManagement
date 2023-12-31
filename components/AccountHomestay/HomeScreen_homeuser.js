import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardList from './CardList';

const HomeScreen_homeuser = ({route}) => {
  const {homeid} = route.params;

  const sampleData = [
    {
      id: 1,
      name: 'John Doe',
      check_in: '2023-01-01',
      check_out: '2023-01-05',
      total_price: 500,
      status: 'Paid',
    },
    {
      id: 2,
      name: 'Jane Doe',
      check_in: '2023-02-01',
      check_out: '2023-02-10',
      total_price: 800,
      status: 'Waiting',
    },
    {
      id: 3,
      name: 'Jane Doe',
      check_in: '2023-02-01',
      check_out: '2023-02-10',
      total_price: 800,
      status: 'Waiting',
    },
    {
      id: 4,
      name: 'Jane Doe',
      check_in: '2023-02-01',
      check_out: '2023-02-10',
      total_price: 800,
      status: 'Waiting',
    },
    // Add more data as needed
  ];

  return (
    <View style={styles.container}>
      <CardList data={sampleData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
});

export default HomeScreen_homeuser;
