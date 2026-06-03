import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    ActivityIndicator, Image 
} from 'react-native';
import profileService from '../../api/profileService';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const TransactionHistoryScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await profileService.getTransactions();
            if (res.status === 'success') {
                setTransactions(res.data.transactions || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.invoice}>#{item.invoice_no}</Text>
                <Text style={[styles.status, item.status === '1' ? styles.statusPaid : styles.statusFailed]}>
                    {item.status === '1' ? 'Paid' : 'Failed'}
                </Text>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="workspace-premium" size={20} color={colors.primary} />
                    <Text style={styles.packageName}>{item.package_name} Plan</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialIcons name="payments" size={20} color={colors.primary} />
                    <Text style={styles.amount}>₹{item.amount}</Text>
                </View>
                <View style={[styles.infoRow, { marginTop: 10 }]}>
                    <MaterialIcons name="event" size={16} color={colors.text.light} />
                    <Text style={styles.date}>{item.purchase_date}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" /> : (
                <FlatList 
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={i => i.tid.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    ListEmptyComponent={<Text style={styles.empty}>No transactions found.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    card: { backgroundColor: colors.surface, borderRadius: 15, padding: 18, marginBottom: 15, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 10, marginBottom: 12 },
    invoice: { fontSize: 13, fontFamily: typography.fontFamily.bold, color: colors.text.light },
    status: { fontSize: 12, fontFamily: typography.fontFamily.bold, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    statusPaid: { backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' },
    statusFailed: { backgroundColor: 'rgba(244, 67, 54, 0.1)', color: colors.error },
    cardBody: {},
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    packageName: { fontSize: 16, fontFamily: typography.fontFamily.bold, color: colors.primary, marginLeft: 10 },
    amount: { fontSize: 18, fontFamily: typography.fontFamily.bold, color: colors.primary, marginLeft: 10 },
    date: { fontSize: 12, color: colors.text.light, marginLeft: 10 },
    empty: { textAlign: 'center', marginTop: 100, color: colors.text.light }
});

export default TransactionHistoryScreen;
