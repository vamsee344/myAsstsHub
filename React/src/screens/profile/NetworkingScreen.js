import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, Alert, ActivityIndicator, Image 
} from 'react-native';
import profileService from '../../api/profileService';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const NetworkingScreen = ({ navigation }) => {
    const [tab, setTab] = useState('requests'); // 'requests' or 'friends'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = (tab === 'requests') 
                ? await profileService.getFriendRequests()
                : await profileService.getFriends();
            
            if (res.status === 'success') {
                setItems(res.data.requests || res.data.friends || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [tab]);

    const handleAction = async (id, action) => {
        try {
            await profileService.handleFriendAction(id, action);
            fetchData();
        } catch (err) {
            Alert.alert("Error", `Could not ${action} request.`);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.avatar}>
                <MaterialIcons name="person" size={30} color={colors.surface} />
            </View>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.first_name} {item.last_name}</Text>
                <Text style={styles.cardSub}>@{item.username}</Text>
            </View>
            {tab === 'requests' ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleAction(item.fr_id, 'accept')} style={[styles.miniBtn, { backgroundColor: colors.primary }]}>
                        <MaterialIcons name="check" size={20} color={colors.surface} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAction(item.fr_id, 'reject')} style={[styles.miniBtn, { backgroundColor: colors.error, marginLeft: 10 }]}>
                        <MaterialIcons name="close" size={20} color={colors.surface} />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('PublicProfile', { username: item.username })}>
                    <MaterialIcons name="chevron-right" size={24} color={colors.text.light} />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, tab === 'requests' && styles.tabActive]} onPress={() => setTab('requests')}>
                    <Text style={[styles.tabText, tab === 'requests' && styles.tabTextActive]}>Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, tab === 'friends' && styles.tabActive]} onPress={() => setTab('friends')}>
                    <Text style={[styles.tabText, tab === 'friends' && styles.tabTextActive]}>My Connections</Text>
                </TouchableOpacity>
            </View>

            {loading ? <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" /> : (
                <FlatList 
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={i => (i.fr_id || i.u_id).toString()}
                    contentContainerStyle={{ padding: 20 }}
                    ListEmptyComponent={<Text style={styles.empty}>No {tab === 'requests' ? 'pending requests' : 'connections'} found.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    tabs: { flexDirection: 'row', backgroundColor: colors.surface, padding: 5, marginHorizontal: 20, marginTop: 20, borderRadius: 25 },
    tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 20 },
    tabActive: { backgroundColor: colors.primary },
    tabText: { fontSize: 14, fontFamily: typography.fontFamily.medium, color: colors.text.secondary },
    tabTextActive: { color: colors.surface },
    card: { backgroundColor: colors.surface, padding: 15, borderRadius: 12, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 2 },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' },
    cardInfo: { flex: 1, marginLeft: 15 },
    cardTitle: { fontSize: 16, fontFamily: typography.fontFamily.bold, color: colors.primary },
    cardSub: { fontSize: 13, color: colors.text.light },
    actions: { flexDirection: 'row' },
    miniBtn: { width: 35, height: 35, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    empty: { textAlign: 'center', marginTop: 100, color: colors.text.light }
});

export default NetworkingScreen;
