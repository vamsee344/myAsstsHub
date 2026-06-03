import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, ActivityIndicator, Alert 
} from 'react-native';
import { useSelector } from 'react-redux';
import propertyService from '../../api/propertyService';
import PropertyCard from '../../components/common/PropertyCard';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const MyAssetsScreen = ({ navigation }) => {
    const { user } = useSelector((state) => state.auth);
    const [myProperties, setMyProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyProperties = async () => {
        setLoading(true);
        try {
            // Assuming the API supports filtering by owner or we filter locally
            // for the sake of completion, we fetch all and filter by current user's profile info 
            // if available, or just call the list endpoint.
            const response = await propertyService.getProperties({ u_id: user?.u_id });
            if (response.status === 'success') {
                setMyProperties(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProperties();
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            "Delete Property",
            "Are you sure you want to remove this listing?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const res = await propertyService.deleteProperty(id);
                            if (res.status === 'success') {
                                Alert.alert("Deleted", "Listing removed successfully.");
                                fetchMyProperties(); // Refresh
                            }
                        } catch (err) {
                            Alert.alert("Error", "Could not delete property.");
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <PropertyCard 
                property={item} 
                onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.l_id })}
            />
            <View style={styles.actions}>
                <TouchableOpacity 
                    style={styles.actionBtn} 
                    onPress={() => navigation.navigate('PostAsset', { editMode: true, property: item })}
                >
                    <MaterialIcons name="edit" size={20} color={colors.primary} />
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionBtn, styles.deleteBtn]} 
                    onPress={() => handleDelete(item.l_id)}
                >
                    <MaterialIcons name="delete-outline" size={20} color={colors.error} />
                    <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>My Listed Assets</Text>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList 
                    data={myProperties}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.l_id?.toString()}
                    contentContainerStyle={styles.listPadding}
                    ListEmptyComponent={
                        <View style={styles.center}>
                            <MaterialIcons name="home-work" size={60} color={colors.border} />
                            <Text style={styles.emptyText}>You haven't listed any assets yet.</Text>
                            <TouchableOpacity 
                                style={styles.addBtn}
                                onPress={() => navigation.navigate('PostAsset')}
                            >
                                <Text style={styles.addBtnText}>List Your First Asset</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: colors.surface },
    backBtn: { marginRight: 15 },
    title: { fontSize: 20, fontFamily: typography.fontFamily.bold, color: colors.primary },
    listPadding: { padding: 20 },
    cardWrapper: { marginBottom: 20, backgroundColor: colors.surface, borderRadius: 16, overflow: 'hidden', elevation: 3 },
    actions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border },
    actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12 },
    deleteBtn: { borderLeftWidth: 1, borderLeftColor: colors.border },
    actionText: { marginLeft: 6, fontWeight: 'bold', color: colors.primary },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyText: { marginTop: 15, fontSize: 16, color: colors.text.light, textAlign: 'center' },
    addBtn: { marginTop: 20, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
    addBtnText: { color: colors.surface, fontWeight: 'bold' }
});

export default MyAssetsScreen;
