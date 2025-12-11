import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 20, color: "#444" }}>
                Reminder WA
            </Text>

            <Text style={{ fontSize: 16, color: "#777", marginTop: 10 }}>
                Atur pengingat otomatis via WhatsApp
            </Text>
        </View>
    );
}
