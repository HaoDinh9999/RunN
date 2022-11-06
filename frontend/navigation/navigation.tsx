import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/Home.screen';
import LoginScreen from '../screens/Login/Login.screen';
import LoginVertifyScreen from '../screens/LoginVertify/LoginVertify.screen';
import ProfileScreen from '../screens/Profile/Profile.screen';
import Tabs from './tabs';
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
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MainNavigation;
