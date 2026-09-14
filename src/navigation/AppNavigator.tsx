import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import { DashboardScreen } from '../screens/DashboardScreen';
import { CheckInScreen } from '../screens/CheckInScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { NudgeScreen } from '../screens/NudgeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, { active: string; inactive: string }> = {
  Dashboard: { active: '🏠', inactive: '🏠' },
  'Check-In': { active: '✅', inactive: '☑️' },
  Train: { active: '🧠', inactive: '🧠' },
  Nudges: { active: '💡', inactive: '💡' },
  History: { active: '📊', inactive: '📊' },
  Profile: { active: '👤', inactive: '👤' },
};

const TabIcon = ({
  name,
  focused,
}: {
  name: string;
  focused: boolean;
}) => {
  const icons = tabIcons[name] || { active: '•', inactive: '•' };
  return (
    <View style={tabStyles.iconWrap}>
      <Text style={tabStyles.icon}>{focused ? icons.active : icons.inactive}</Text>
      {focused && <View style={tabStyles.dot} />}
    </View>
  );
};

const tabStyles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    paddingTop: 2,
  },
  icon: {
    fontSize: 20,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7C3AED',
    marginTop: 3,
  },
});

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1B2E',
            borderTopColor: '#2D2640',
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            marginTop: 2,
          },
          tabBarActiveTintColor: '#A78BFA',
          tabBarInactiveTintColor: '#4B5563',
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="Dashboard" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Check-In"
          component={CheckInScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="Check-In" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Train"
          component={TrainScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="Train" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Nudges"
          component={NudgeScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="Nudges" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="History" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
