import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { reminderService } from "../../api/services/reminderService";

export default function ReminderPendingScreen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const getPending = async (
        pageNumber = 1,
        refresh = false
    ) => {
        try {
            if (pageNumber > 1) {
                setLoadingMore(true);
            }
            const response = await reminderService.getPending(pageNumber);
            const result = response.data;
            const items = result.data || [];
            setData(prev => {
                if (pageNumber === 1 || refresh) {
                    return items;
                }
                return [...prev, ...items];
            });
            setPage(
                result.pagination?.current_page || 1
            );
            setLastPage(
                result.pagination?.last_page || 1
            );
        } catch (error) {
            console.log("Pending Error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
            setLoadingMore(false);
        }
    };
    useEffect(() => {
        getPending(
            1,
            true
        );
    }, []);
    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        getPending(1, true);
    };
    const loadMore = () => {
        if (
            loadingMore ||
            page >= lastPage
        ) {
            return;
        }
        const nextPage = page + 1;
        setPage(nextPage);
        getPending(nextPage);
    };
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Icon
                        name="logo-whatsapp"
                        size={28}
                        color="#25D366"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.phone}>
                        {item.phone}
                    </Text>
                    <Text style={styles.time}>
                        {item.reminder_at_formatted}
                    </Text>
                </View>
                <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>
                        PENDING
                    </Text>
                </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.label}>
                PESAN REMINDER
            </Text>
            <View style={styles.messageBox}>
                <Text style={styles.message}>
                    {item.message}
                </Text>
            </View>
            <View style={styles.footer}>
                <Icon
                    name="time-outline"
                    size={18}
                    color="#64748B"
                />
                <Text style={styles.infoText}>
                    Menunggu jadwal pengiriman
                </Text>
            </View>
        </View>
    );
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color="#25D366"
                />
                <Text style={styles.loadingText}>
                    Memuat reminder...
                </Text>
            </View>
        );
    }
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            // scrollbar kanan
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            scrollIndicatorInsets={{ right: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#25D366"]}
                />
            }
            // pagination
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
                loadingMore ? (
                    <View style={styles.footerLoading}>
                        <ActivityIndicator
                            size="small"
                            color="#25D366"
                        />
                        <Text style={styles.footerText}>
                            Memuat halaman berikutnya...
                        </Text>
                    </View>
                ) : null
            }
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Icon
                        name="time-outline"
                        size={80}
                        color="#CBD5E1"
                    />
                    <Text style={styles.emptyTitle}>
                        Tidak Ada Reminder
                    </Text>
                    <Text style={styles.emptyText}>
                        Semua reminder sudah terkirim.
                    </Text>
                </View>
            }
            contentContainerStyle={styles.list}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
        />
    );
}
const styles = StyleSheet.create({
    list: {
        padding: 16,
        backgroundColor: "#F4F7FB",
        flexGrow: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        marginTop: 15,
        color: "#64748B"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4
        }
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#ECFDF5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    phone: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A"
    },
    time: {
        marginTop: 5,
        fontSize: 13,
        color: "#64748B"
    },
    pendingBadge: {
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 30
    },
    pendingText: {
        color: "#B45309",
        fontWeight: "700",
        fontSize: 11
    },
    divider: {
        height: 1,
        backgroundColor: "#EEF2F7",
        marginVertical: 16
    },
    label: {
        fontSize: 12,
        fontWeight: "700",
        color: "#94A3B8",
        marginBottom: 8
    },
    messageBox: {
        backgroundColor: "#F8FAFC",
        padding: 14,
        borderRadius: 12
    },
    message: {
        fontSize: 15,
        color: "#334155",
        lineHeight: 22
    },
    footer: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    infoText: {
        marginLeft: 6,
        color: "#64748B",
        fontSize: 13
    },
    footerLoading: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    footerText: {
        marginTop: 8,
        color: "#64748B"
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyTitle: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: "700",
        color: "#1E293B"
    },
    emptyText: {
        marginTop: 8,
        color: "#64748B"
    }
});