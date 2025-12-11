import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";
import { SettingsScreen } from "../screens";
import ReminderHomeScreen from "../screens/reminder/reminderHomeScreen";
import ReminderScreen from "../screens/reminder/reminderScreen";
import ReminderListScreen from "../screens/reminder/reminderListScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ReminderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ReminderHome"
                component={ReminderHomeScreen}
                options={{ title: "Reminder" }}
            />
            <Stack.Screen
                name="ReminderScreen"
                component={ReminderScreen}
                options={{ title: "Create Reminder" }}
            />
            <Stack.Screen
                name="ReminderList"
                component={ReminderListScreen}
                options={{ title: "List Reminder" }}
            />
        </Stack.Navigator>
    );
}

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home-outline";
                    } else if (route.name === "Reminder") {
                        iconName = "notifications-outline";
                    } else if (route.name === "Settings") {
                        iconName = "settings-outline";
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />

            <Tab.Screen name="Reminder" component={ReminderStack} />

            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
