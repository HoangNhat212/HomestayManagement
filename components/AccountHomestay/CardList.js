import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Đảm bảo đã import thư viện firestore

const CardList = ({data, navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <TouchableOpacity
          key={item.booking_id}
          onPress={() => {
            navigation.navigate('DetailConsumer', {item});
          }}>
          <Card
            booking={item} // Truyền toàn bộ đối tượng booking cho Card
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const Card = ({booking}) => {
  const {user_id, name, check_in, check_out, total_price, status, room_number} =
    booking;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userSnapshot = await firestore()
          .collection('Users')
          .doc(user_id)
          .get();

        if (userSnapshot.exists) {
          setUserData(userSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user_id]);

  return (
    <View style={[styles.cardContainer]}>
      <View
        style={[
          styles.card,
          status === 'Paid' ? styles.paidCard : styles.waitingCard,
        ]}>
        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Name: `}</Text>
          <Text style={[styles.cardText, styles.rowItem]}>{`${
            userData?.name || name
          }`}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Check-in: `}</Text>
          <Text style={[styles.cardText, styles.rowItem]}>{`${check_in}`}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Room: `}</Text>
          <Text
            style={[styles.cardText, styles.rowItem]}>{`${room_number}`}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={[styles.boldText, styles.rowItem]}>{`Check-out: `}</Text>
          <Text
            style={[styles.cardText, styles.rowItem]}>{`${check_out}`}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text
            style={[styles.boldText, styles.rowItem]}>{`Total Price:`}</Text>
          <Text
            style={[
              styles.totalPriceText,
              styles.rowItem,
            ]}>{`${total_price}$`}</Text>
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
    height: 230,
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
