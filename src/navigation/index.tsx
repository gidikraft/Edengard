import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabs";
import { useSelector } from "react-redux";
import { LoginScreen, SignupScreen } from "@/screens/auth";
import { RootState } from "@/store/Store";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

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

          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default RootNavigation;
