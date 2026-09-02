import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal
} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { reminderService } from "../../api/services/reminderService";

export default function ReminderScreen() {

    // ------------------ HOOKS ------------------
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [reminderAt, setReminderAt] = useState('');

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [tempDate, setTempDate] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [successModal, setSuccessModal] = useState(false);
    // -------------------------------------------

    const formatDateTime = (date) => {
        const pad = (n) => (n < 10 ? "0" + n : n);
        return (
            `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
        );
    };

    const openDatePicker = () => {
        setShowDate(true);
    };

    const onDateSelected = (event, selectedDate) => {
        setShowDate(false);

        if (selectedDate) {
            setTempDate(selectedDate);
            setShowTime(true);

            if (errors.reminderAt) {
                setErrors((prev) => ({ ...prev, reminderAt: null }));
            }
        }
    };

    const onTimeSelected = (event, selectedTime) => {
        setShowTime(false);

        if (selectedTime) {
            const finalDate = new Date(tempDate);
            finalDate.setHours(selectedTime.getHours());
            finalDate.setMinutes(selectedTime.getMinutes());
            finalDate.setSeconds(0);

            setReminderAt(formatDateTime(finalDate));

            // Hapus error jika sebelumnya muncul
            if (errors.reminderAt) {
                setErrors((prev) => ({ ...prev, reminderAt: null }));
            }
        }
    };

    const saveReminder = async () => {
        let newErrors = {};

        if (!phone) newErrors.phone = "Nomor wajib diisi";
        if (!message) newErrors.message = "Pesan wajib diisi";
        if (!reminderAt) newErrors.reminderAt = "Tanggal & waktu wajib diisi";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            await reminderService.create({
                phone,
                message,
                reminder_at: reminderAt,
            });

            setSuccessModal(true);

            setPhone("");
            setMessage("");
            setReminderAt("");
            setErrors({});

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 403) {
                    Alert.alert("Error", data.message);
                    return;
                }

                if (status === 422) {
                    Alert.alert("Validasi", data.message);
                    return;
                }

                Alert.alert("Error", data.message || "Terjadi kesalahan.");
            } else {
                Alert.alert("Error", "Tidak dapat terhubung ke server.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Reminder</Text>

            {/* PHONE INPUT */}
            <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="Phone Number (contoh: 62xxxxxxxxx)"
                keyboardType="numeric"
                placeholderTextColor="#555"
                inputMode="numeric"
                value={phone}
                onChangeText={(text) => {
                    const clean = text.replace(/[^0-9]/g, "");
                    setPhone(clean);

                    if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: null }));
                    }
                }}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            {/* MESSAGE */}
            <TextInput
                style={[
                    styles.input,
                    { height: 120, textAlignVertical: "top" },
                    errors.message && styles.inputError
                ]}
                placeholder="Enter notification message"
                placeholderTextColor="#555"
                value={message}
                onChangeText={(text) => {
                    setMessage(text);
                    if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: null }));
                    }
                }}
                multiline={true}
            />
            {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

            {/* DATE PICKER */}
            <TouchableOpacity
                style={[styles.input, errors.reminderAt && styles.inputError]}
                onPress={openDatePicker}
            >
                <Text style={{ color: reminderAt ? "#000" : "#999" }}>
                    {reminderAt || "Pilih tanggal & waktu"}
                </Text>
            </TouchableOpacity>
            {errors.reminderAt && <Text style={styles.errorText}>{errors.reminderAt}</Text>}

            {showDate && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={onDateSelected}
                />
            )}

            {showTime && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="spinner"
                    is24Hour={true}
                    onChange={onTimeSelected}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={saveReminder}>
                <Text style={styles.buttonText}>Save Reminder</Text>
            </TouchableOpacity>

            {/* SUCCESS MODAL */}
            <Modal transparent visible={successModal} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Success!</Text>
                        <Text style={styles.modalText}>Reminder berhasil dibuat.</Text>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setSuccessModal(false)}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },

    title: { fontSize: 26, fontWeight: "bold", marginVertical: 20 },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 14,
        marginBottom: 8,
        backgroundColor: "#fafafa",
    },

    inputError: { borderColor: "red" },

    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 2,
    },

    button: {
        backgroundColor: "#22c55e",
        padding: 15,
        borderRadius: 12,
        marginTop: 10
    },

    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
        fontWeight: "600"
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 12,
        alignItems: "center",
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#22c55e",
        marginBottom: 10,
    },

    modalText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },

    modalButton: {
        backgroundColor: "#22c55e",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
});
