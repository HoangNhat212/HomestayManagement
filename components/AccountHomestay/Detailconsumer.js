import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const DetailConsumer = ({route, navigation}) => {
  const {item} = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userSnapshot = await firestore()
          .collection('Users')
          .doc(item.user_id)
          .get();

        if (userSnapshot.exists) {
          setUserData(userSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePayButtonPress = async () => {
    try {
      let snapshot = await firestore()
        .collection('Booking')
        .where('booking_id', '==', item.booking_id)
        .get();

      if (!snapshot.empty) {
        const updatePromises = snapshot.docs.map(async doc => {
          await doc.ref.update({
            status: 'Paid',
          });
        });

        await Promise.all(updatePromises);
        console.log('Status updated successfully.');
        navigation.goBack();
      } else {
        console.log('No matching documents.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Your existing UI */}
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{userData?.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userData?.email}</Text>

      <Text style={styles.label}>Gender:</Text>
      <Text style={styles.value}>{userData?.gender}</Text>

      <Text style={styles.label}>Date of Birth:</Text>
      <Text style={styles.value}>{userData?.date_of_birth}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{userData?.phone}</Text>

      {/* Pay button */}
      {item.status !== 'Paid' && (
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayButtonPress}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  payButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailConsumer;
