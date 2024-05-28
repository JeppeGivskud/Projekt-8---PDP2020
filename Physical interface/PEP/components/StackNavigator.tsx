import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DataHandler from "./DataHandler";
import RenderDataScreen from "./RenderDataScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="FetchData">
      <Stack.Screen name = "DataHandler" component={DataHandler} />
      <Stack.Screen name = "RenderDataScreen" component={RenderDataScreen} />
    </Stack.Navigator>
  );
};

