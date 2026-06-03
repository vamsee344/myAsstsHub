import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput 
} from 'react-native';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const ReviewListScreen = ({ route, navigation }) => {
    const { username } = route.params;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({ rate_value: 5, comment: '' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await profileService.getPublicProfile(username);
            if (res.status === 'success') {
                setItems(res.data.allreviews || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [username]);

    const handleSave = async () => {
        if (!form.comment) return Alert.alert('Error', 'Comment is required.');
        
        try {
            const res = await profileService.submitReview(username, form);
            if (res.status === 'success') {
                setModalVisible(false);
                setForm({ rate_value: 5, comment: '' });
                fetchData();
            }
        } catch (err) {
            Alert.alert('Error', 'Could not submit review.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.stars}>
                    {[1,2,3,4,5].map(s => (
                        <MaterialIcons 
                            key={s} 
                            name={s <= item.rate_value ? 'star' : 'star-border'} 
                            size={16} 
                            color={colors.secondary} 
                        />
                    ))}
                </View>
                <Text style={styles.date}>{item.created_at}</Text>
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.reviewer}>- {item.first_name} {item.last_name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" /> : (
                <FlatList 
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={i => i.review_id.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    ListEmptyComponent={<Text style={styles.empty}>No reviews yet. Be the first!</Text>}
                />
            )}
            
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <MaterialIcons name="rate-review" size={30} color={colors.surface} />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Rate Agent</Text>
                        
                        <View style={styles.starPicker}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <TouchableOpacity key={s} onPress={() => setForm({ ...form, rate_value: s })}>
                                    <MaterialIcons 
                                        name={s <= form.rate_value ? 'star' : 'star-border'} 
                                        size={40} 
                                        color={colors.secondary} 
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput 
                            style={styles.input}
                            placeholder="Write your experience..."
                            multiline
                            numberOfLines={4}
                            value={form.comment}
                            onChangeText={t => setForm({ ...form, comment: t })}
                        />
                        
                        <View style={styles.modalBtns}>
                            <AppButton title="Cancel" type="outline" onPress={() => setModalVisible(false)} style={{flex: 1, marginRight: 10}} />
                            <AppButton title="Submit" onPress={handleSave} style={{flex: 1}} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    card: { backgroundColor: colors.surface, padding: 18, borderRadius: 15, marginBottom: 15, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    stars: { flexDirection: 'row' },
    date: { fontSize: 12, color: colors.text.light },
    comment: { fontSize: 15, color: colors.text.primary, lineHeight: 22, fontStyle: 'italic' },
    reviewer: { fontSize: 13, fontFamily: typography.fontFamily.bold, color: colors.primary, marginTop: 10, textAlign: 'right' },
    fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: colors.primary, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 25 },
    modalContent: { backgroundColor: colors.surface, borderRadius: 20, padding: 25 },
    modalTitle: { fontSize: 20, fontFamily: typography.fontFamily.bold, color: colors.primary, marginBottom: 20, textAlign: 'center' },
    starPicker: { flexDirection: 'row', justifyContent: 'center', marginBottom: 25 },
    input: { backgroundColor: colors.background, padding: 15, borderRadius: 12, fontSize: 14, minHeight: 100, textAlignVertical: 'top', marginBottom: 25 },
    modalBtns: { flexDirection: 'row' },
    empty: { textAlign: 'center', marginTop: 100, color: colors.text.light }
});

export default ReviewListScreen;
