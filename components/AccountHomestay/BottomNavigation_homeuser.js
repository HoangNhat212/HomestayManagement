import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/consts/colors';
import sizes from '../../assets/consts/sizes';
import HomeScreen_homeuser from './HomeScreen_homeuser';

const Bottom = createBottomTabNavigator();

function BottomTabs(props) {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarActiveBackgroundColor: colors.dark,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: styles.tabBar,
      }}
      tabBar={props => (
        <BottomFabBar
          mode={'default'}
          isRtl={false}
          focusedButtonStyle={styles.tabBarFocusedButton}
          bottomBarContainerStyle={styles.tabBarBottomContainer}
          {...props}
        />
      )}>
      <Bottom.Screen
        name="Home"
        component={HomeScreen_homeuser}
        initialParams={{homeid: props.homeid}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={sizes.iconMedium}
              color={focused ? colors.yellow : colors.white}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

const BottomTabsNavigator_HomeStayUser = ({route}) => {
  const {homeid} = route.params;
  return <BottomTabs homeid={homeid} />;
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    shadow: true,
  },
  tabBarIcon: {
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  tabBarBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarFocusedButton: {
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
});
export default BottomTabsNavigator_HomeStayUser;
