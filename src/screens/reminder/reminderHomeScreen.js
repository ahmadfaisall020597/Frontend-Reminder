import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ReminderHomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reminder Menu</Text>

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => navigation.navigate("ReminderScreen")}
            >
                <Text style={styles.buttonText}>➕ Create Reminder</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonList}
                onPress={() => navigation.navigate("ReminderList")}
            >
                <Text style={styles.buttonText}>📃 List Reminder</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f3f4f6" },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 40 },
    buttonCreate: { backgroundColor: "#22c55e", padding: 15, borderRadius: 12, marginBottom: 20 },
    buttonList: { backgroundColor: "#3b82f6", padding: 15, borderRadius: 12 },
    buttonText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "600" },
});
