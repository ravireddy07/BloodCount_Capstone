import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddBloodUnitScreen from '../screens/AddBloodUnitScreen';
import RequestBloodScreen from '../screens/RequestBloodScreen';
import HelpScreen from '../screens/HelpScreen';
import DonateBloodScreen from '../screens/DonateBloodScreen';
import EditProfileScreen from '../screens/EditProfileScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    SignUp: SignUpScreen,
    AddBloodUnit : AddBloodUnitScreen,
    RequestBlood : RequestBloodScreen,
    DonateBlood : DonateBloodScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';



const HelpStack = createStackNavigator(
  {
    Help: HelpScreen,
  },
  config
);

HelpStack.navigationOptions = {
  tabBarLabel: 'Help',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HelpStack.path = '';

const EditProfileStack = createStackNavigator(
  {
    EditProfile: EditProfileScreen,
  },
  config
);

EditProfileStack.navigationOptions = {
  tabBarLabel: 'Edit Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-options'}`
          : 'md-information-circle'
      }
    />
  ),
};

EditProfileStack.path = '';




const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Blood Banks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Certificates',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  HelpStack,
  SettingsStack,
  EditProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
