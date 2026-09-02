import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { authService } from "../../api/services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [secure, setSecure] = useState(true);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Validasi", "Email dan Password wajib diisi.");
            return;
        }

        try {
            setLoading(true);

            await authService.login(email, password);

            signIn();
        } catch (error) {
            Alert.alert(
                "Login Gagal",
                error.response?.data?.message || "Terjadi kesalahan."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#F5F7FB"
            />

            <View style={styles.card}>

                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/images/reminder-me.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.subtitle}>
                    Login untuk melanjutkan
                </Text>

                {/* EMAIL */}

                <View style={styles.inputContainer}>

                    <Icon
                        name="mail-outline"
                        size={22}
                        color="#777"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                </View>

                {/* PASSWORD */}

                <View style={styles.inputContainer}>

                    <Icon
                        name="lock-closed-outline"
                        size={22}
                        color="#777"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={secure}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        onPress={() => setSecure(!secure)}
                    >
                        <Icon
                            name={
                                secure
                                    ? "eye-off-outline"
                                    : "eye-outline"
                            }
                            size={22}
                            color="#777"
                        />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Text style={styles.loginText}>
                                LOGIN
                            </Text>

                            <Icon
                                name="arrow-forward"
                                size={20}
                                color="#fff"
                            />
                        </>
                    )}
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
        justifyContent: "center",
        padding: 25,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 25,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 15,
    },

    logo: {
        width: 160,
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 15,
    },

    logoImage: {
        width: 160,
        height: 160,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },

    subtitle: {
        color: "#777",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 30,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        paddingHorizontal: 15,
        marginBottom: 18,
        backgroundColor: "#FAFAFA",
    },

    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 16,
    },

    loginButton: {
        backgroundColor: "#25D366",
        borderRadius: 15,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    loginText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
        marginRight: 8,
    },

});