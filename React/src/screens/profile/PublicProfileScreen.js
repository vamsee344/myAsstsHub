import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, 
    TouchableOpacity, ActivityIndicator, Image, FlatList 
} from 'react-native';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const PublicProfileScreen = ({ route, navigation }) => {
    const { username } = route.params;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestSent, setRequestSent] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await profileService.getPublicProfile(username);
            if (res.status === 'success') {
                setData(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [username]);

    const handleConnect = async () => {
        try {
            await profileService.sendFriendRequest(username);
            setRequestSent(true);
            Alert.alert("Sent", "Friend request sent successfully!");
        } catch (err) {
            Alert.alert("Oops", "Could not send request.");
        }
    };

    if (loading) return <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" />;
    if (!data) return <Text style={styles.empty}>Agent not found.</Text>;

    const { userdetails, countreview, propertylistings } = data;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <MaterialIcons name="person" size={60} color={colors.surface} />
                </View>
                <Text style={styles.name}>{userdetails.first_name} {userdetails.last_name}</Text>
                <Text style={styles.username}>@{userdetails.username}</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>{userdetails.user_type?.toUpperCase()}</Text></View>
                
                <View style={styles.stats}>
                    <Stat label="Listings" value={propertylistings.length} />
                    <TouchableOpacity onPress={() => navigation.navigate('ReviewList', { username })} style={styles.stat}>
                        <Text style={styles.statVal}>{countreview}</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </TouchableOpacity>
                    <Stat label="Views" value={data.listview || 0} />
                </View>

                <View style={styles.actionRow}>
                    <AppButton 
                        title={requestSent ? "Pending" : "Connect"} 
                        onPress={handleConnect}
                        disabled={requestSent}
                        style={{ flex: 1, marginRight: 10 }} 
                    />
                    <AppButton 
                        title="Review" 
                        type="outline" 
                        onPress={() => navigation.navigate('ReviewList', { username })}
                        style={{ flex: 1 }} 
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About & Bio</Text>
                <Text style={styles.bio}>
                    {userdetails.bio || "No biography provided yet. Professional real estate agent serving the community."}
                </Text>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Active Listings</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search', { username })}>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listingRow}>
                    {propertylistings.length > 0 ? propertylistings.slice(0, 5).map(item => (
                        <TouchableOpacity key={item.l_id} style={styles.listingCard} onPress={() => navigation.navigate('PropertyDetails', { property: item })}>
                            <View style={styles.listingImg}><MaterialIcons name="home" size={40} color={colors.primary} /></View>
                            <Text style={styles.listingTitle} numberOfLines={1}>{item.ptitle}</Text>
                            <Text style={styles.listingPrice}>₹{item.price}</Text>
                        </TouchableOpacity>
                    )) : <Text style={styles.emptyListing}>No active listings found.</Text>}
                </ScrollView>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const Stat = ({ label, value }) => (
    <View style={styles.stat}>
        <Text style={styles.statVal}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { backgroundColor: colors.primary, padding: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    name: { fontSize: 22, fontFamily: typography.fontFamily.bold, color: colors.surface },
    username: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 10 },
    badge: { backgroundColor: colors.secondary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
    badgeText: { fontSize: 10, fontFamily: typography.fontFamily.bold, color: colors.surface },
    stats: { flexDirection: 'row', marginTop: 25, marginBottom: 25, width: '100%', justifyContent: 'space-around' },
    stat: { alignItems: 'center' },
    statVal: { fontSize: 18, fontFamily: typography.fontFamily.bold, color: colors.surface },
    statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
    actionRow: { flexDirection: 'row', width: '100%' },
    section: { padding: 25 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontFamily: typography.fontFamily.bold, color: colors.primary },
    viewAll: { fontSize: 14, color: colors.secondary, fontFamily: typography.fontFamily.bold },
    bio: { fontSize: 15, color: colors.text.secondary, lineHeight: 22 },
    listingRow: { flexDirection: 'row' },
    listingCard: { width: 150, backgroundColor: colors.surface, padding: 12, borderRadius: 15, marginRight: 15, elevation: 2 },
    listingImg: { width: '100%', height: 100, backgroundColor: colors.background, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    listingTitle: { fontSize: 14, fontFamily: typography.fontFamily.bold, color: colors.primary },
    listingPrice: { fontSize: 13, color: colors.secondary, marginTop: 4 },
    empty: { textAlign: 'center', marginTop: 100, color: colors.text.light },
    emptyListing: { color: colors.text.light, fontStyle: 'italic' }
});

export default PublicProfileScreen;
