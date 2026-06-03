import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, Alert, ActivityIndicator, ScrollView 
} from 'react-native';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const MembershipPlansScreen = ({ navigation }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await profileService.getPackages();
            if (res.status === 'success') {
                setPlans(res.data.packages || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handlePurchase = (plan) => {
        Alert.alert(
            "Confirm Purchase", 
            `Upgrade to ${plan.package_name} for ₹${plan.amount}?`,
            [
                { text: "Cancel" },
                { text: "Proceed", onPress: async () => {
                    try {
                        const res = await profileService.purchasePackage({ p_id: plan.p_id });
                        if (res.status === 'success') {
                            Alert.alert("Success", "Plan purchased successfully!", [
                                { text: "View Transactions", onPress: () => navigation.navigate('TransactionHistory') }
                            ]);
                        }
                    } catch (e) {
                        Alert.alert("Error", "Could not complete purchase. Check your balance.");
                    }
                }}
            ]
        );
    };

    const renderPlan = ({ item }) => (
        <View style={[styles.card, item.package_name.toLowerCase() === 'gold' && styles.goldCard]}>
            <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, item.package_name.toLowerCase() === 'gold' && { color: colors.surface }]}>{item.package_name}</Text>
                <MaterialIcons 
                    name={item.package_name.toLowerCase() === 'gold' ? 'workspace-premium' : 'military-tech'} 
                    size={30} 
                    color={item.package_name.toLowerCase() === 'gold' ? colors.surface : colors.primary} 
                />
            </View>
            <Text style={[styles.price, item.package_name.toLowerCase() === 'gold' && { color: colors.surface }]}>₹{item.amount}</Text>
            <Text style={[styles.duration, item.package_name.toLowerCase() === 'gold' && { color: 'rgba(255,255,255,0.7)' }]}>Valid for {item.validity} days</Text>
            
            <View style={styles.features}>
                <Feature icon="check" text={`${item.no_listing} Listings`} inverted={item.package_name.toLowerCase() === 'gold'} />
                <Feature icon="check" text={`${item.no_featured} Featured Slots`} inverted={item.package_name.toLowerCase() === 'gold'} />
                <Feature icon="check" text="Priority Support" inverted={item.package_name.toLowerCase() === 'gold'} />
            </View>

            <AppButton 
                title={item.package_name === 'Free' ? 'Current Plan' : 'Select Plan'}
                disabled={item.package_name === 'Free'}
                onPress={() => handlePurchase(item)}
                type={item.package_name.toLowerCase() === 'gold' ? 'primary' : 'outline'}
                style={item.package_name.toLowerCase() === 'gold' ? styles.goldBtn : {}}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Upgrade Your Assets</Text>
            <Text style={styles.headerSub}>Choose a membership plan to unlock professional real estate features.</Text>
            
            {loading ? <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" /> : (
                <FlatList 
                    data={plans}
                    renderItem={renderPlan}
                    keyExtractor={i => i.p_id.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const Feature = ({ icon, text, inverted }) => (
    <View style={styles.featureRow}>
        <MaterialIcons name={icon} size={18} color={inverted ? colors.surface : colors.primary} />
        <Text style={[styles.featureText, inverted && { color: 'rgba(255,255,255,0.9)' }]}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerTitle: { fontSize: 24, fontFamily: typography.fontFamily.bold, color: colors.primary, textAlign: 'center', marginTop: 30 },
    headerSub: { fontSize: 14, color: colors.text.secondary, textAlign: 'center', marginHorizontal: 40, marginTop: 10, marginBottom: 20 },
    card: { backgroundColor: colors.surface, borderRadius: 20, padding: 25, marginBottom: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
    goldCard: { backgroundColor: colors.primary },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { fontSize: 21, fontFamily: typography.fontFamily.bold, color: colors.primary },
    price: { fontSize: 32, fontFamily: typography.fontFamily.bold, color: colors.primary, marginTop: 15 },
    duration: { fontSize: 13, color: colors.text.light, marginBottom: 20 },
    features: { marginBottom: 25 },
    featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    featureText: { fontSize: 14, fontFamily: typography.fontFamily.medium, color: colors.text.secondary, marginLeft: 10 },
    goldBtn: { backgroundColor: colors.surface, color: colors.primary }
});

export default MembershipPlansScreen;
