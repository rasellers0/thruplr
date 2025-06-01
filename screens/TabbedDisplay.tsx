import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardView from './ViewProfile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FiltersView from './FiltersView';
import MatchesView from './matchesView';
import selectMatchView from './selectMatchView';

const Tab = createBottomTabNavigator();

function TabbedDisplay(){
    return (
        <Tab.Navigator initialRouteName="CardView"
            screenOptions={{tabBarActiveTintColor: '#e91e63'}}>
            <Tab.Screen name="FiltersView" component={FiltersView} 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Filters',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="filter" color={'black'} size={12} />
                    ),
                  }}/>
            <Tab.Screen name="CardView" component={selectMatchView} 
            options={{
                headerShown: false,
                tabBarLabel: 'Cards',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cards" color={'black'} size={12} />
                ),
              }}/>
            <Tab.Screen name="MatchesView" component={MatchesView} 
            options={{
                headerShown: false,
                tabBarLabel: 'Matches',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="heart" color={'black'} size={12} />
                ),
              }}/>
        </Tab.Navigator>
        
    );
}

export default TabbedDisplay;