import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabs";
import { useSelector } from "react-redux";
import { ForgotPasswordScreen, LoginScreen, SignupScreen } from "@/screens/auth";
import { RootState } from "@/store/Store";
import { ProfileScreen } from "@/screens/profile";
import { TUser } from "@/types/auth";
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<TUser>();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log(JSON.stringify(user), 'user');
    setUser(user);
    if (initializing) setInitializing(false);
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Group >

            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />

            {/* <Stack.Screen
              name="ProfileSCreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            /> */}
          </Stack.Group>

        ) : (
          <Stack.Group >
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />

          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default RootNavigation;
