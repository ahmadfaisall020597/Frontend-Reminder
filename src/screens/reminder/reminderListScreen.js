import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { reminderService } from "../../api/services/reminderService";

export default function ReminderListScreen() {
    const [list, setList] = useState([]);

    const getData = async () => {
        try {
            const res = await reminderService.getAll();
            setList(res.data.data || []);
        } catch (error) {
            console.log("Error get reminders:", error);
        }
    };

    useEffect(() => {
        getData(); 
        const interval = setInterval(() => {
            getData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;

        return date.toLocaleString("id-ID", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.time}>{formatDate(item.reminder_at)}</Text>

                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.sent ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)" }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: item.sent ? "#10b981" : "#ef4444" }
                    ]}>
                        {item.sent ? "Terkirim" : "Pending"}
                    </Text>
                </View>
            </View>

            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.phone}>📞 {item.phone}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reminder List</Text>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 20,
        backgroundColor: "#f3f4f6"
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        marginBottom: 20,
        color: "#111827"
    },

    card: {
        padding: 18,
        borderRadius: 16,
        marginBottom: 16,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    time: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3b82f6"
    },

    message: {
        fontSize: 16,
        marginBottom: 8,
        color: "#374151",
        fontWeight: "500"
    },

    phone: {
        fontSize: 14,
        color: "#6b7280"
    },

    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "700"
    },
});
