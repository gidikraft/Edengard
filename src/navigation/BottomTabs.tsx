import { Icon } from "@/components/";
import useColorScheme from "@/hooks/useColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../theme/colors";
import { RootTabParamList, RootTabScreenProps } from "./types";
import { ProfileScreen } from "@/screens/profile";
import { palette } from "@/theme/";
import { EventsScreen, HomeScreen } from "@/screens/Home";

/**
 * Bottom Tab.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{
				tabBarActiveTintColor: colors[colorScheme].tint,
			}}>
			<BottomTab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={({ navigation }: RootTabScreenProps<'HomeScreen'>) => ({
					headerShown: false,
					title: 'Home',
					tabBarIcon: ({ color, focused }) => <Icon name={focused ? "home" : "home-inactive"} color={color} size={16} />,
					//   headerRight: () => (
					//     <Pressable
					//       onPress={() => navigation.navigate('Modal')}
					//       style={({ pressed }) => ({
					//         opacity: pressed ? 0.5 : 1,
					//       })}>
					//       <FontAwesome
					//         name="address-card"
					//         size={25}
					//         color={Colors[colorScheme].text}
					//         style={{ marginRight: 15 }}
					//       />
					//     </Pressable>
					//   ),
				})}
			/>

			<BottomTab.Screen
				name="EventsScreen"
				component={EventsScreen}
				options={{
					headerShown: false,
					title: 'Events',
					tabBarIcon: ({ color, focused }) => <Icon name={focused ? "transfer" : "transfer-inactive"} color={color} size={16} />,
				}}
			/>

			<BottomTab.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					headerShown: false,
					title: 'Settings',
					tabBarIcon: ({ color, focused }) => <Icon name={focused ? "user" : "user-inactive"} color={color} size={16} fill={color} />,
				}}
			/>

		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;
