import React, { useEffect, useState } from "react";
import { NavigationContainer, NavigationContainerRef, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabs";
import { useSelector } from "react-redux";
import { ForgotPasswordScreen, LoginScreen, SignupScreen } from "@/screens/auth";
import { RootState } from "@/store/Store";
import { TUser } from "@/types/auth";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { NotificationScreen } from "@/screens/Home";
import { SubscriptionScreen } from "@/screens/events";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const routeNameRef = React.useRef();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  const firebaseAuth = auth();

  // Handle user state changes
  const onAuthStateChanged = (userState: React.SetStateAction<FirebaseAuthTypes.User | null>) => {
    setUser(userState);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    firebaseAuth.onUserChanged(fbUser => {
      if (fbUser) {
        // User is signed in or token was refreshed.
        setUser(fbUser);
        console.log(user, fbUser, 'user state changed');
      }
    })
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [firebaseAuth.onUserChanged]);

  if (initializing) return null;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator>
        {user?.emailVerified ? (
          <Stack.Group >

            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SubscriptionScreen"
              component={SubscriptionScreen}
              options={{ headerShown: false }}
            />
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
