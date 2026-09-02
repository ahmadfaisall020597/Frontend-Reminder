import React from "react";
import {
    createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "../screens";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: "#999",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Icon
                            name="home-outline"
                            size={size}
                            color={color}
                        />
                    );
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
        </Tab.Navigator>
    );
}