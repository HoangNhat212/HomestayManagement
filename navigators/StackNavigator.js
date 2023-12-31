import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Notification from '../components/ExploreComponent/NotiScreen';
import Login from '../components/LoginComponent/SignInScreen';
import SignUp from '../components/LoginComponent/SignUpScreen';
import DetailHomestay from '../components/ExploreComponent/DetailHomestayScreen';
import SearchHomestay from '../components/ExploreComponent/SearchHomestayScreen';
import NotificationSetting from '../components/AccountComponent/NotificationSetting';
import BottomTabsNavigator from './BottomTabsNavigator';
import TopTabsNavigator from './TopTabsNavigator';
import colors from '../assets/consts/colors';
import DetailsReward from '../components/RewardComponent/DetailReward';
import Information from '../components/AccountComponent/Information';
import FastBookingDetailHotel from '../components/FastBookingComponent/FastBookingDetailHotelScreen';
import FavoritesScreen from '../components/FavoritesScreen';
import History from '../components/AccountComponent/History';
import PayScreen from '../components/ExploreComponent/PayScreen';
import ForgotPasswordScreen from '../components/LoginComponent/ForgotPasswordScreen';
import Homescreen_admin from '../components/Admin/homescreen_admin';
import BottomTabsNavigator_Admin from '../components/Admin/bottom_navigator_admin';
import DetailHomeScreen_admin from '../components/Admin/detailHomeScreen_admin';
import AddScreen_admin from '../components/Admin/addscreen_admin';
import Roomscreen_admin from '../components/Admin/Roomscreen_admin';
import RoomType_admin from '../components/Admin/RoomType_admin';
import EditRoomType_admin from '../components/Admin/EditRoomType_admin';
import AddRoomType_admin from '../components/Admin/AddRoomType_admin';
import AddVoucher_admin from '../components/Admin/AddVoucher_admin';
import DetailVoucher_admin from '../components/Admin/DetailVoucher_admin';
import AddRoom_admin from '../components/Admin/AddRoom_admin';
import BottomTabsNavigator_HomeStayUser from '../components/AccountHomestay/BottomNavigation_homeuser';

const Stack = createNativeStackNavigator();
const myTheme = {
  colors: {
    background: colors.white,
  },
};
function StackTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Information"
        component={Information}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabsNavigator_Admin"
        component={BottomTabsNavigator_Admin}
        options={{
          headerTitle: 'HomeScreen', // Đổi tên header ở đây
          headerShown: true, // Nếu muốn hiển thị header
        }}
      />
      <Stack.Screen
        name="BottomTabsNavigator_HomeStayAccount"
        component={BottomTabsNavigator_HomeStayUser}
        options={{
          headerTitle: 'HomeScreen', // Đổi tên header ở đây
          headerShown: true, // Nếu muốn hiển thị header
        }}
      />

      <Stack.Screen
        name="TopTabsNavigator"
        component={TopTabsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailHomestay"
        component={DetailHomestay}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailHomeScreen_Admin"
        component={DetailHomeScreen_admin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddScreen_Admin"
        component={AddScreen_admin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RoomScreen_admin"
        component={Roomscreen_admin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RoomType_admin"
        component={RoomType_admin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditRoomType_admin"
        component={EditRoomType_admin}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddRoomType_admin"
        component={AddRoomType_admin}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddRoom_admin"
        component={AddRoom_admin}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="DetailVoucher_admin"
        component={DetailVoucher_admin}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddVoucher_admin"
        component={AddVoucher_admin}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="SearchHomestay"
        component={SearchHomestay}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="FastBookingDetailHotel"
        component={FastBookingDetailHotel}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsReward"
        component={DetailsReward}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={PayScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="HistoryScreen" component={History} />
      <Stack.Screen
        name="AdminHomeScreen"
        component={Homescreen_admin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
const StackNavigator = () => {
  return (
    <NavigationContainer theme={myTheme}>
      <StackTabs />
    </NavigationContainer>
  );
};

export default StackNavigator;
