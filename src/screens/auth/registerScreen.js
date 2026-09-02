import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { authService } from "../../api/services/authService";

export default function RegisterScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
    });

    const register = async () => {
        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.password_confirmation
        ) {
            Alert.alert(
                "Validasi",
                "Semua field wajib diisi."
            );
            return;
        }

        if (form.password !== form.password_confirmation) {
            Alert.alert(
                "Validasi",
                "Konfirmasi password tidak sama."
            );
            return;
        }

        try {
            setLoading(true);

            const res = await authService.register(form);

            Alert.alert(
                "Berhasil",
                res.data?.message || "User berhasil didaftarkan.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (e) {
            Alert.alert(
                "Register Gagal",
                e.response?.data?.message || "Terjadi kesalahan."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.logo}>
                <Icon
                    name="person-add"
                    size={55}
                    color="#fff"
                />
            </View>

            <Text style={styles.title}>
                Register User
            </Text>

            <Text style={styles.subtitle}>
                Tambahkan akun baru ke sistem
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                value={form.name}
                onChangeText={(text) =>
                    setForm({
                        ...form,
                        name: text,
                    })
                }
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(text) =>
                    setForm({
                        ...form,
                        email: text,
                    })
                }
            />

            <Text style={styles.label}>
                Role
            </Text>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={form.role}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
                            role: value,
                        })
                    }
                >
                    <Picker.Item
                        label="User"
                        value="user"
                    />

                    <Picker.Item
                        label="Admin"
                        value="admin"
                    />
                </Picker>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={form.password}
                    onChangeText={(text) =>
                        setForm({
                            ...form,
                            password: text,
                        })
                    }
                />

                <TouchableOpacity
                    onPress={() =>
                        setShowPassword(!showPassword)
                    }
                >
                    <Icon
                        name={
                            showPassword
                                ? "eye-off-outline"
                                : "eye-outline"
                        }
                        size={24}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Konfirmasi Password"
                    secureTextEntry={!showConfirm}
                    value={form.password_confirmation}
                    onChangeText={(text) =>
                        setForm({
                            ...form,
                            password_confirmation: text,
                        })
                    }
                />

                <TouchableOpacity
                    onPress={() =>
                        setShowConfirm(!showConfirm)
                    }
                >
                    <Icon
                        name={
                            showConfirm
                                ? "eye-off-outline"
                                : "eye-outline"
                        }
                        size={24}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={register}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        REGISTER
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>
                    ← Kembali ke Home
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },

    content: {
        padding: 25,
        justifyContent: "center",
        flexGrow: 1,
    },

    logo: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#2563eb",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        color: "#111827",
    },

    subtitle: {
        textAlign: "center",
        color: "#6b7280",
        marginBottom: 35,
        marginTop: 8,
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 14,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 8,
        color: "#374151",
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 14,
        backgroundColor: "#fff",
        marginBottom: 18,
        overflow: "hidden",
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 14,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        marginBottom: 18,
    },

    passwordInput: {
        flex: 1,
        height: 55,
    },

    button: {
        backgroundColor: "#2563eb",
        height: 55,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 17,
    },

    backText: {
        textAlign: "center",
        marginTop: 25,
        color: "#2563eb",
        fontWeight: "600",
        fontSize: 15,
    },
});