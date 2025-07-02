// src/navigation/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Assets from '../screens/Assets';
import Dashboard from '../screens/Dashboard';
import Incidents from '../screens/Incidents';
import Requests from '../screens/Requests';
import Users from '../screens/Users';
import { colors, fontSize } from '../styles/colors';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingHorizontal:20,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Assets"
        component={Assets}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="pulse" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Incidents"
        component={Incidents}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="tools" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="message-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-group" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
