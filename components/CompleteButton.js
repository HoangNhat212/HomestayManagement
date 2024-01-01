import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CompletedBox = ({status}) => {
  console.log('status', status);
  const boxColor =
    status == 'Waiting' ? 'orange' : status == 'Paid' ? 'green' : '#000';

  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <View
        style={{
          width: 100,
          height: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: boxColor,
        }}>
        <Text style={[styles.text]}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CompletedBox;
