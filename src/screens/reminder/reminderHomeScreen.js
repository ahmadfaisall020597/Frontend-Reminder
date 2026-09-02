import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ReminderHomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Reminder</Text>
                <Text style={styles.subtitle}>
                    Kelola reminder WhatsApp dengan mudah
                </Text>
            </View>

            {/* Create Reminder Card */}
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.createCard}
                onPress={() => navigation.navigate("ReminderScreen")}
            >
                <View style={styles.iconContainer}>
                    <Icon
                        name="add-circle"
                        size={38}
                        color="#25D366"
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.cardTitle}>
                        Create Reminder
                    </Text>

                    <Text style={styles.cardSubtitle}>
                        Tambahkan reminder WhatsApp baru dengan cepat.
                    </Text>
                </View>

                <Icon
                    name="chevron-forward"
                    size={28}
                    color="#FFFFFF"
                />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FB",
        padding: 20,
    },

    header: {
        marginTop: 20,
        marginBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#222",
    },

    subtitle: {
        marginTop: 6,
        fontSize: 16,
        color: "#777",
    },

    createCard: {
        backgroundColor: "#25D366",
        borderRadius: 22,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",

        elevation: 6,

        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 18,
    },

    content: {
        flex: 1,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
    },

    cardSubtitle: {
        marginTop: 6,
        color: "#E9FFF0",
        fontSize: 15,
        lineHeight: 22,
    },
});