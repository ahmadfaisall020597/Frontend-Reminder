import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import ReminderScreen from "../screens/reminder/reminderScreen";
import ReminderPendingScreen from "../screens/reminder/reminderPendingScreen";
import ReminderReceivedScreen from "../screens/reminder/reminderReceivedScreen";
import RegisterScreen from "../screens/auth/registerScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                animation: "slide_from_right"
            }}
        >

            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: "Register User",
                }}
            />

            <Stack.Screen
                name="ReminderScreen"
                component={ReminderScreen}
                options={{
                    title: "Create Reminder"
                }}
            />

            <Stack.Screen
                name="ReminderPending"
                component={ReminderPendingScreen}
                options={{
                    title: "Scheduled Reminder"
                }}
            />

            <Stack.Screen
                name="ReminderReceived"
                component={ReminderReceivedScreen}
                options={{
                    title: "History Reminder"
                }}
            />
        </Stack.Navigator>
    );
}