import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, FlatList, 
    TouchableOpacity, Alert, ActivityIndicator, Modal, ScrollView 
} from 'react-native';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const EducationListScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        school: '', degree: '', field: '', edu_from: '', edu_to: '', 
        edu_city: '', edu_state: '', edu_country: 'India'
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await profileService.getProfile();
            if (res.status === 'success') {
                setItems(res.data.useredu || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        if (!form.school || !form.degree) return Alert.alert('Error', 'School and Degree are required.');
        
        try {
            if (editId) {
                await profileService.updateEducation(editId, form);
            } else {
                await profileService.addEducation(form);
            }
            setModalVisible(false);
            fetchData();
        } catch (err) {
            Alert.alert('Error', 'Could not save education.');
        }
    };

    const handleDelete = (id) => {
        Alert.alert("Delete", "Remove this education?", [
            { text: "Cancel" },
            { text: "Delete", style: 'destructive', onPress: async () => {
                await profileService.deleteEducation(id);
                fetchData();
            }}
        ]);
    };

    const openEdit = (item) => {
        setEditId(item.edu_id);
        setForm(item);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.degree} in {item.field}</Text>
                <Text style={styles.cardSub}>{item.school}</Text>
                <Text style={styles.cardDate}>{item.edu_from} - {item.edu_to || 'Present'}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => openEdit(item)}><MaterialIcons name="edit" size={20} color={colors.primary} /></TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.edu_id)} style={{ marginLeft: 15 }}><MaterialIcons name="delete-outline" size={20} color={colors.error} /></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator style={{marginTop: 50}} color={colors.primary} size="large" /> : (
                <FlatList 
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={i => i.edu_id?.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    ListEmptyComponent={<Text style={styles.empty}>No education added yet.</Text>}
                />
            )}
            
            <TouchableOpacity style={styles.fab} onPress={() => { setEditId(null); setForm({ school: '', degree: '', field: '', edu_from: '', edu_to: '', edu_city: '', edu_state: '', edu_country: 'India' }); setModalVisible(true); }}>
                <MaterialIcons name="add" size={30} color={colors.surface} />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.modalTitle}>{editId ? 'Edit Education' : 'Add Education'}</Text>
                    <AppInput label="School / University" value={form.school} onChangeText={t => setForm({...form, school: t})} />
                    <AppInput label="Degree" placeholder="e.g. B.Tech, MBA" value={form.degree} onChangeText={t => setForm({...form, degree: t})} />
                    <AppInput label="Field of Study" placeholder="e.g. Computer Science" value={form.field} onChangeText={t => setForm({...form, field: t})} />
                    
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{flex: 1, marginRight: 10}}><AppInput label="From" placeholder="YYYY-MM-DD" value={form.edu_from} onChangeText={t => setForm({...form, edu_from: t})} /></View>
                        <View style={{flex: 1}}><AppInput label="To" placeholder="YYYY-MM-DD" value={form.edu_to} onChangeText={t => setForm({...form, edu_to: t})} /></View>
                    </View>
                    
                    <AppInput label="City" value={form.edu_city} onChangeText={t => setForm({...form, edu_city: t})} />
                    
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

export default EducationListScreen;
