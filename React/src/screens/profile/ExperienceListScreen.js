import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, Alert, ActivityIndicator, Modal 
} from 'react-native';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const ExperienceListScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        company: '', position: '', exp_from: '', exp_to: '', 
        exp_work: 'full-time', exp_description: '', exp_city: '', 
        exp_state: '', exp_country: 'India'
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await profileService.getProfile();
            if (res.status === 'success') {
                setItems(res.data.userexp || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        if (!form.company || !form.position) return Alert.alert('Error', 'Company and Position are required.');
        
        try {
            if (editId) {
                await profileService.updateExperience(editId, form);
            } else {
                await profileService.addExperience(form);
            }
            setModalVisible(false);
            fetchData();
        } catch (err) {
            Alert.alert('Error', 'Could not save experience.');
        }
    };

    const handleDelete = (id) => {
        Alert.alert("Delete", "Remove this experience?", [
            { text: "Cancel" },
            { text: "Delete", style: 'destructive', onPress: async () => {
                await profileService.deleteExperience(id);
                fetchData();
            }}
        ]);
    };

    const openEdit = (item) => {
        setEditId(item.exp_id);
        setForm(item);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.position}</Text>
                <Text style={styles.cardSub}>{item.company}</Text>
                <Text style={styles.cardDate}>{item.exp_from} - {item.exp_to || 'Present'}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => openEdit(item)}><MaterialIcons name="edit" size={20} color={colors.primary} /></TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.exp_id)} style={{ marginLeft: 15 }}><MaterialIcons name="delete-outline" size={20} color={colors.error} /></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" /> : (
                <FlatList 
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={i => i.exp_id?.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    ListEmptyComponent={<Text style={styles.empty}>No experience added yet.</Text>}
                />
            )}
            
            <TouchableOpacity style={styles.fab} onPress={() => { setEditId(null); setForm({ company: '', position: '', exp_from: '', exp_to: '', exp_work: 'full-time', exp_description: '', exp_city: '', exp_state: '', exp_country: 'India' }); setModalVisible(true); }}>
                <MaterialIcons name="add" size={30} color={colors.surface} />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.modalTitle}>{editId ? 'Edit Experience' : 'Add Experience'}</Text>
                    <AppInput label="Company" value={form.company} onChangeText={t => setForm({...form, company: t})} />
                    <AppInput label="Position" value={form.position} onChangeText={t => setForm({...form, position: t})} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{flex: 1, marginRight: 10}}><AppInput label="From" placeholder="YYYY-MM-DD" value={form.exp_from} onChangeText={t => setForm({...form, exp_from: t})} /></View>
                        <View style={{flex: 1}}><AppInput label="To" placeholder="YYYY-MM-DD" value={form.exp_to} onChangeText={t => setForm({...form, exp_to: t})} /></View>
                    </View>
                    <AppInput label="Description" multiline value={form.exp_description} onChangeText={t => setForm({...form, exp_description: t})} />
                    
                    <View style={styles.modalBtns}>
                        <AppButton title="Cancel" type="outline" onPress={() => setModalVisible(false)} style={{flex: 1, marginRight: 10}} />
                        <AppButton title="Save" onPress={handleSave} style={{flex: 1}} />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    card: { backgroundColor: colors.surface, padding: 15, borderRadius: 12, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 2 },
    cardInfo: { flex: 1 },
    cardTitle: { fontSize: 16, fontFamily: typography.fontFamily.bold, color: colors.primary },
    cardSub: { fontSize: 14, color: colors.text.secondary },
    cardDate: { fontSize: 12, color: colors.text.light, marginTop: 4 },
    actions: { flexDirection: 'row' },
    fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: colors.primary, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    modalContent: { padding: 25, backgroundColor: colors.background },
    modalTitle: { fontSize: 20, fontFamily: typography.fontFamily.bold, color: colors.primary, marginBottom: 20 },
    modalBtns: { flexDirection: 'row', marginTop: 30 },
    empty: { textAlign: 'center', marginTop: 100, color: colors.text.light }
});

export default ExperienceListScreen;
