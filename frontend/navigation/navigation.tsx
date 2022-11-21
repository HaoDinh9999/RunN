import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailProductScreen from '../screens/Market/DetailProduct/DetailProduct.screen';

import HomeScreen from '../screens/Home/Home.screen';
import LoginScreen from '../screens/Login/Login.screen';
import LoginVertifyScreen from '../screens/LoginVertify/LoginVertify.screen';
import ProfileScreen from '../screens/Profile/Profile.screen';
import Tabs from './tabs';
import FilterScreen from '../screens/Market/Filter/Filter.screen';
import BudgetScreen from '../screens/Wallet/Budget.screen';
import MoveScreen from '../screens/Move/Move.screen';
import StartRunningScreen from '../screens/Move/StartRunning/StartRunning.screen'
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'loginVertify'}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="loginVertify" component={LoginVertifyScreen} />
        <Stack.Screen name="home" component={Tabs} />
        <Stack.Screen name="profile" component={ProfileScreen}/>
        <Stack.Screen name="detailProduct" component={DetailProductScreen}/>
        <Stack.Screen name="filter" component={FilterScreen}/>
        <Stack.Screen name="budget" component={BudgetScreen}/>
        <Stack.Screen name="move" component={MoveScreen}/>
        <Stack.Screen name="startRunning" component={StartRunningScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MainNavigation;
