import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const CardList = ({data}) => {
  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <Card
          key={item.id}
          name={item.name}
          checkIn={item.check_in}
          checkOut={item.check_out}
          totalPrice={item.total_price}
          status={item.status}
        />
      ))}
    </ScrollView>
  );
};

const Card = ({name, checkIn, checkOut, totalPrice, status}) => {
  return (
    <View style={[styles.cardContainer]}>
      <View
        style={[
          styles.card,
          status === 'Paid' ? styles.paidCard : styles.waitingCard,
        ]}>
        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Name: `}</Text>
          <Text style={[styles.cardText, styles.rowItem]}>{`${name}`}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Check-in: `}</Text>
          <Text style={[styles.cardText, styles.rowItem]}>{`${checkIn}`}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Check-out: `}</Text>
          <Text style={[styles.cardText, styles.rowItem]}>{`${checkOut}`}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text
            style={[styles.boldText, styles.rowItem]}>{`Total Price:`}</Text>
          <Text
            style={[
              styles.totalPriceText,
              styles.rowItem,
            ]}>{`${totalPrice}$`}</Text>
        </View>
        <Text
          style={[
            styles.statusText,
            status === 'Paid' ? styles.paidStatus : styles.waitingStatus,
          ]}>
          {status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    height: 180,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  statusText: {
    alignSelf: 'flex-end',
  },
  paidCard: {
    borderColor: 'green',
  },
  waitingCard: {
    borderColor: 'orange',
  },
  paidStatus: {
    color: 'green',
  },
  waitingStatus: {
    color: 'orange',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rowItem: {
    flex: 1,
  },
});

export default CardList;
