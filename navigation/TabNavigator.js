import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { CreateStory } from '../screens/CreateStory';
import { Feed } from '../screens/Feed';

export const AppTabNavigator = createBottomTabNavigator({
  Feed : {
    screen: Feed,
    navigationOptions :{
      //tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Home",
    }
  },
  CreateStory: {
    screen: CreateStory,
    navigationOptions :{
      //tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Add Member",
    }
  }
});