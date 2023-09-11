import { Icon } from "@/components/";
import useColorScheme from "@/hooks/useColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../theme/colors";
import { RootTabParamList, RootTabScreenProps } from "./types";
import { Home, SecondScreen, ThirdScreen } from "@/screens/";
import { ProfileScreen } from "@/screens/profile";
import { palette } from "@/theme";

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
				component={Home}
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
				name="SecondScreen"
				component={SecondScreen}
				options={{
					headerShown: false,
					title: 'Transfer',
					tabBarIcon: ({ color, focused }) => <Icon name={focused ? "transfer" : "transfer-inactive"} color={color} size={16} />,
				}}
			/>

			<BottomTab.Screen
				name="ProfileSCreen"
				component={ProfileScreen}
				options={{
					headerShown: false,
					title: 'Settings',
					tabBarIcon: ({ color, focused }) => <Icon name={focused ? "settings" : "transactions-inactive"} color={color} size={16} fill={color} />,
				}}
			/>

		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;
