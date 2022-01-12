import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import UserScreen from '../screens/User';
import StoreScreen from '../screens/WineStore';
import ProducerScreen from '../screens/Producer';
import { colors } from '../constants';
import QRScanner from '../components/QRScanner';
import Certified from '../screens/Certified';
import NotCertified from '../screens/NotCertified';

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    // <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'UserScreen'}>
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScanner}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Certified"
          component={Certified}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="NotCertified"
          component={NotCertified}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </AuthProvider>
  );
};

const BottomTabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor={colors.white}
      shifting={true}
      barStyle={styles.bottomBar}>
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarColor: colors.blue3,
          tabBarIcon: ({ color }) => (
            <Feather color={color} name="user" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Wine Store',
          tabBarColor: colors.red3,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name="storefront-outline"
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProducerScreen"
        component={ProducerScreen}
        options={{
          tabBarLabel: 'Producer',
          tabBarColor: colors.green3,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name="fruit-grapes-outline"
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    position: 'relative',
    color: 'purple',
  },
});

export default Navigation;
