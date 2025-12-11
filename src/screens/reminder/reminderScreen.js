import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { reminderService } from "../../api/services/reminderService";

export default function ReminderScreen() {

    // ------------------ HOOKS (URUTAN TIDAK BOLEH BERUBAH) ------------------
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [reminderAt, setReminderAt] = useState('');

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [tempDate, setTempDate] = useState(new Date());
    // ------------------------------------------------------------------------

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
        }
    };

    const saveReminder = async () => {
        if (!phone || !message || !reminderAt) {
            Alert.alert("Validation Error", "Semua field harus diisi!");
            return;
        }

        try {
            await reminderService.create({
                phone,
                message,
                reminder_at: reminderAt,
            });

            Alert.alert("Success", "Reminder berhasil dibuat!");

            setPhone("");
            setMessage("");
            setReminderAt("");

        } catch (error) {
            console.log("Error create reminder:", error);
            Alert.alert("Error", "Gagal membuat reminder.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Reminder</Text>

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="numeric"
                inputMode="numeric"
                value={phone}
                onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
            />

            <TextInput
                style={styles.input}
                placeholder="Message"
                value={message}
                onChangeText={setMessage}
            />

            <TouchableOpacity style={styles.input} onPress={openDatePicker}>
                <Text style={{ color: reminderAt ? "#000" : "#999" }}>
                    {reminderAt || "Pilih tanggal & waktu"}
                </Text>
            </TouchableOpacity>

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
        marginBottom: 15
    },
    button: {
        backgroundColor: "#22c55e",
        padding: 15,
        borderRadius: 12,
        marginTop: 20
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
        fontWeight: "600"
    },
});
