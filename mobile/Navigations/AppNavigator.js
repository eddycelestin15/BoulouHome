import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Dashboard from '../Screens/Dashboard';
import Activity from '../Screens/Activity';
import User from '../Screens/User';
import PhoneCharging from "../Screens/Activities/PhoneCharging"

const Stack = createStackNavigator();

function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="PhoneCharging" component={PhoneCharging} />
      </Stack.Navigator>
  );
}

export default AppNavigator;
