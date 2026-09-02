import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authService } from "../../api/services/authService";
import { useAuth } from "../../context/AuthContext";

const { signOut } = useAuth();

export default function HomeScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
            return;
        }
        loadUser();
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const data = await AsyncStorage.getItem("user");
        if (data) {
            setUser(JSON.parse(data));
        }
    };

    const logout = () => {
        Alert.alert(
            "Logout",
            "Anda yakin ingin keluar?",
            [
                { text: "Batal" },
                {
                    text: "Logout",
                    onPress: async () => {
                        try {
                            await authService.logout();
                        } catch (e) {
                            // jika token sudah invalid tetap logout lokal
                        }

                        await signOut();
                    },
                },
            ]
        );
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* TOP HEADER */}
            <View style={styles.header}>
                <View style={styles.topRow}>
                    <View>
                        <Text style={styles.welcome}>
                            Welcome back 👋
                        </Text>
                        <Text style={styles.username}>
                            {user?.name || "User"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={logout}
                        style={styles.logoutCircle}
                    >

                        <Icon
                            name="log-out-outline"
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.profileName}>
                            {user?.name}
                        </Text>
                        <Text style={styles.email}>
                            {user?.email}
                        </Text>
                        <View style={styles.roleBadge}>
                            <Text style={styles.role}>
                                {user?.role || "user"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <Text style={styles.section}>
                Quick Menu
            </Text>

            {/* CREATE */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => { navigation.navigate("ReminderScreen") }}
            >

                <View
                    style={[styles.iconBox, { backgroundColor: "#fef3c7" }]}>
                    <Icon name="create-outline" size={28} color="#d97706" />
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>
                        Create Reminder
                    </Text>
                    <Text style={styles.cardDesc}>
                        Buat reminder WhatsApp baru
                    </Text>
                </View>
                <Icon name="chevron-forward" size={22} />
            </TouchableOpacity>

            {/* PENDING */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => { navigation.navigate("ReminderPending") }}
            >

                <View style={[styles.iconBox, { backgroundColor: "#dcfce7" }]}>
                    <Icon name="calendar-outline" size={28} color="#16a34a" />
                </View>

                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>
                        Scheduled Reminder
                    </Text>
                    <Text style={styles.cardDesc}>
                        Reminder yang belum dikirim
                    </Text>
                </View>
                <Icon name="chevron-forward" size={22} />
            </TouchableOpacity>

            {/* HISTORY */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => { navigation.navigate("ReminderReceived") }}
            >

                <View style={[styles.iconBox, { backgroundColor: "#dbeafe" }]}>
                    <Icon name="checkmark-done-outline" size={28} color="#2563eb" />
                </View>

                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>
                        History Reminder
                    </Text>
                    <Text style={styles.cardDesc}>
                        Reminder yang sudah terkirim
                    </Text>
                </View>
                <Icon name="chevron-forward" size={22} />
            </TouchableOpacity>

            {/* REGISTER USER (ADMIN ONLY) */}
            {user?.role === "admin" && (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Register")}
                >
                    <View
                        style={[
                            styles.iconBox,
                            { backgroundColor: "#ede9fe" },
                        ]}
                    >
                        <Icon
                            name="person-add-outline"
                            size={28}
                            color="#7c3aed"
                        />
                    </View>

                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>
                            Register User
                        </Text>

                        <Text style={styles.cardDesc}>
                            Tambah akun admin baru
                        </Text>
                    </View>

                    <Icon
                        name="chevron-forward"
                        size={22}
                    />
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    header: {
        backgroundColor: "#25D366",
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    welcome: {
        color: "#dcfce7",
        fontSize: 15,
    },
    username: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 5,
    },
    logoutCircle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.25)",
        justifyContent: "center",
        alignItems: "center",
    },
    profileCard: {
        marginTop: 25,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#22c55e",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    avatarText: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
    },
    profileName: {
        fontSize: 18,
        fontWeight: "700",
    },
    email: {
        color: "#64748b",
        marginTop: 4,
    },
    roleBadge: {
        marginTop: 8,
        backgroundColor: "#dcfce7",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    role: {
        color: "#15803d",
        fontWeight: "600",
    },
    section: {
        fontSize: 20,
        fontWeight: "700",
        margin: 25,
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 18,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
    },
    iconBox: {
        width: 55,
        height: 55,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    cardText: {
        flex: 1,
        marginLeft: 15,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
    },
    cardDesc: {
        color: "#64748b",
        marginTop: 5,
    },
});