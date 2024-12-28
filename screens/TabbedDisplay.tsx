import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardView from './CardView';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FiltersView from './FiltersView';
import MatchesView from './matchesView';

const Tab = createBottomTabNavigator();

function TabbedDisplay(){
    return (
        <Tab.Navigator initialRouteName="CardView"
            screenOptions={{tabBarActiveTintColor: '#e91e63'}}>
            <Tab.Screen name="FiltersView" component={FiltersView} 
                options={{
                    tabBarLabel: 'Filters',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="filter" color={'black'} size={12} />
                    ),
                  }}/>
            <Tab.Screen name="CardView" component={CardView} 
            options={{
                tabBarLabel: 'Cards',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cards" color={'black'} size={12} />
                ),
              }}/>
            <Tab.Screen name="MatchesView" component={MatchesView} 
            options={{
                tabBarLabel: 'Matches',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="heart" color={'black'} size={12} />
                ),
              }}/>
        </Tab.Navigator>
        
    );
}

export default TabbedDisplay;