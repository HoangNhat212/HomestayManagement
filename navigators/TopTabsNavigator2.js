import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from '../assets/consts/colors';
import sizes from '../assets/consts/sizes';

const Top = createMaterialTopTabNavigator();

const ListItem = ({notifications}) => {
  if (notifications.length > 0) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={notifications}
          vertical
          contentContainerStyle={styles.flatList}
          renderItem={({item}) => <DetailItem item={item} />}
        />
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/homestay-cacf0.appspot.com/o/notification.png?alt=media&token=5f8450b8-df5f-4a9b-a338-e378036bd090',
          }}
        />
        <Text style={styles.text}>There are no Notifications</Text>
      </View>
    );
  }
};

const DetailItem = ({item}) => {
  return (
    <TouchableOpacity>
      <View style={styles.itemCard}>
        <View style={styles.itemIconContainer}>
          <Ionicons
            name={
              item.type === 'Setting'
                ? 'settings-sharp'
                : item.type === 'Booking'
                ? 'calendar'
                : item.type === 'Promotion'
                ? 'md-ribbon'
                : 'mail'
            }
            size={sizes.iconSmall}
            color={colors.primary}
          />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDetails}>{item.details}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TopTabsNavigator2 = ({navigation, notifications}) => {
  const filterNotificationsByType = type => {
    return notifications.filter(item => item.type === type);
  };

  const AllScreen = () => {
    return <ListItem notifications={notifications} />;
  };

  const BookingScreen = () => {
    const filteredNotifications = filterNotificationsByType('Booking');
    return <ListItem notifications={filteredNotifications} />;
  };

  const PromotionScreen = () => {
    const filteredNotifications = filterNotificationsByType('Promotion');
    return <ListItem notifications={filteredNotifications} />;
  };

  const OthersScreen = () => {
    const filteredNotifications = filterNotificationsByType('Others');
    return <ListItem notifications={filteredNotifications} />;
  };

  return (
    <Top.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
        tabBarAllowFontScaling: true,
        tabBarPressColor: colors.transparent,
        tabBarIndicatorStyle: styles.tabBarIndicator,
      }}>
      <Top.Screen name="All" component={AllScreen} />
      <Top.Screen name="Booking" component={BookingScreen} />
      <Top.Screen name="Promotion" component={PromotionScreen} />
      <Top.Screen name="Others" component={OthersScreen} />
    </Top.Navigator>
  );
};

export default TopTabsNavigator2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  tabBar: {
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Lato-Light',
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  tabBarIndicator: {
    width: 70,
    backgroundColor: colors.light,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 35,
  },
  flatList: {
    paddingBottom: 30,
  },
  itemCard: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    paddingTop: 20,
    borderWidth: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.gray2,
  },
  itemIconContainer: {
    height: 45,
    width: 45,
    backgroundColor: colors.light,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  itemInfo: {},
  itemTitle: {
    color: colors.black,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginVertical: 10,
  },
  itemDetails: {
    width: 255,
    color: colors.black,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  itemDate: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 15,
    right: -20,
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  image: {
    height: 100,
    width: 90,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.black,
    marginVertical: 15,
  },
});
