import React, { useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from './screens/HomeScreen';
import AddMenuScreen from './screens/AddMenuScreen';
import FilterScreen from './screens/FilterScreen';
import TotalCostScreen from './screens/TotalCostScreen';

export type MenuItem = { 
  id: number;
  name: string;
  description: string; 
  course: string;
  price: number; 
}; 
      
export type RootStackParamList = {
  Home: undefined; 
  AddMenu: undefined; 
  Filter: undefined;
  TotalCost: undefined; 
};

        
const Stack = createNativeStackNavigator<RootStackParamList>();
        
export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
          
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...(props as any)} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
        <Stack.Screen name="AddMenu">
          {(props) => <AddMenuScreen {...(props as any)} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
  <Stack.Screen name="Filter">
    {(props) => <FilterScreen {...(props as any)} menuItems={menuItems} setMenuItems={setMenuItems} />}
  </Stack.Screen>
  <Stack.Screen name="TotalCost" options={{ title: 'Total Cost Summary' }}>
    {props => <TotalCostScreen {...props} menuItems={menuItems} />}
  </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}