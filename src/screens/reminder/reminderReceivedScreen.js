import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { reminderService } from '../../api/services/reminderService'

export default function ReminderReceivedScreen() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const getReceived = async (pageNumber = 1, refresh = false) => {
        try {
            if (pageNumber > 1) {
                setLoadingMore(true)
            }
            const response = await reminderService.getReceived(pageNumber)
            const result = response.data.data || []
            const pagination = response.data.pagination
            setLastPage(pagination?.last_page || 1)
            setData(prev => {
                if (pageNumber === 1 || refresh) {
                    return result
                }
                return [...prev, ...result]
            })
        } catch (error) {
            console.log('Received Error:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
            setLoadingMore(false)
        }
    }

    useEffect(() => {
        getReceived(1)
    }, [])
    const onRefresh = () => {
        setRefreshing(true)
        setPage(1)
        getReceived(1, true)
    }

    const loadMore = () => {
        if (loadingMore || page >= lastPage) {
            return
        }
        const nextPage = page + 1
        setPage(nextPage)
        getReceived(nextPage)
    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Icon name='logo-whatsapp' size={28} color='#22C55E' />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.phone}>{item.phone}</Text>
                    <Text style={styles.time}>
                        {item.reminder_at_formatted ??
                            new Date(item.reminder_at).toLocaleString('id-ID')}
                    </Text>
                </View>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>TERKIRIM</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.label}>PESAN REMINDER</Text>
            <View style={styles.messageBox}>
                <Text style={styles.message}>{item.message}</Text>
            </View>
            <View style={styles.footer}>
                <Icon name='checkmark-circle' size={18} color='#22C55E' />
                <Text style={styles.footerText}>Reminder berhasil dikirim</Text>
            </View>
        </View>
    )

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#22C55E' />
                <Text style={styles.loadingText}>Memuat riwayat reminder...</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            // =====================
            // SCROLL BAR KANAN
            // =====================

            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            scrollIndicatorInsets={{
                right: 1,
            }}
            // =====================
            // REFRESH
            // =====================

            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#22C55E']}
                />
            }
            // =====================
            // PAGINATION
            // =====================

            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
                loadingMore ? (
                    <View style={styles.loadingMore}>
                        <ActivityIndicator size='small' color='#22C55E' />

                        <Text style={styles.loadingMoreText}>
                            Memuat halaman berikutnya...
                        </Text>
                    </View>
                ) : null
            }
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Icon name='mail-open-outline' size={80} color='#CBD5E1' />

                    <Text style={styles.emptyTitle}>Belum Ada Riwayat</Text>

                    <Text style={styles.emptyText}>
                        Reminder yang sudah terkirim akan muncul di sini.
                    </Text>
                </View>
            }
            contentContainerStyle={{
                padding: 16,
                backgroundColor: '#F5F7FB',
                flexGrow: 1,
            }}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
        />
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 15,
        color: '#64748B',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    phone: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },
    time: {
        marginTop: 5,
        fontSize: 13,
        color: '#64748B',
    },
    badge: {
        backgroundColor: '#22C55E',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 15,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 8,
    },
    messageBox: {
        backgroundColor: '#F8FAFC',
        padding: 14,
        borderRadius: 12,
    },
    message: {
        fontSize: 15,
        color: '#334155',
        lineHeight: 22,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    footerText: {
        marginLeft: 6,
        color: '#64748B',
        fontSize: 13,
    },
    loadingMore: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingMoreText: {
        marginTop: 8,

        color: '#64748B',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: '700',
        color: '#1E293B',
    },
    emptyText: {
        marginTop: 8,
        textAlign: 'center',
        color: '#64748B',
        lineHeight: 22,
    },
})
