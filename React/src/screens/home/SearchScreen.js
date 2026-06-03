import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, TextInput, FlatList, 
    TouchableOpacity, ActivityIndicator 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProperties } from '../../redux/slices/propertySlice';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { properties, loading, categories } = useSelector((state) => state.property);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Initial load or clear search
        const delayDebounceFn = setTimeout(() => {
            dispatch(fetchAllProperties({ 
                search: searchQuery, 
                category: selectedCategory 
            }));
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory]);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.resultItem}
            onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.l_id })}
        >
            <View style={styles.resultImage} />
            <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultLocation}>{item.city}</Text>
                <Text style={styles.resultPrice}>₹ {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Search Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={20} color={colors.text.light} />
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Search properties or cities..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                </View>
            </View>

            {/* Category Filter Chips */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity 
                        style={[styles.chip, !selectedCategory && styles.activeChip]}
                        onPress={() => setSelectedCategory(null)}
                    >
                        <Text style={[styles.chipText, !selectedCategory && styles.activeChipText]}>All</Text>
                    </TouchableOpacity>
                    {categories.map((cat) => (
                        <TouchableOpacity 
                            key={cat.c_id}
                            style={[styles.chip, selectedCategory === cat.c_id && styles.activeChip]}
                            onPress={() => setSelectedCategory(cat.c_id)}
                        >
                            <Text style={[styles.chipText, selectedCategory === cat.c_id && styles.activeChipText]}>
                                {cat.category_name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Results List */}
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList 
                    data={properties}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.l_id}
                    contentContainerStyle={styles.listPadding}
                    ListEmptyComponent={
                        <View style={styles.center}>
                            <Text style={styles.emptyText}>No properties found matching your search.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};

// Internal Import for ScrollView as it was missed in destruction
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingTop: 60, backgroundColor: colors.surface },
    backBtn: { marginRight: 15 },
    searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, paddingHorizontal: 15, borderRadius: 12, height: 46 },
    searchInput: { flex: 1, marginLeft: 10, color: colors.text.primary, fontSize: 16 },
    filterContainer: { paddingVertical: 15, paddingLeft: 15 },
    chip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.surface, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: colors.border },
    activeChip: { backgroundColor: colors.primary, borderColor: colors.primary },
    chipText: { color: colors.text.secondary, fontWeight: '500' },
    activeChipText: { color: colors.surface },
    listPadding: { padding: 15 },
    resultItem: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 2 },
    resultImage: { width: 100, height: 100, backgroundColor: colors.border },
    resultInfo: { flex: 1, padding: 12, justifyContent: 'center' },
    resultTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    resultLocation: { fontSize: 12, color: colors.text.light, marginBottom: 4 },
    resultPrice: { fontSize: 15, color: colors.primary, fontWeight: 'bold' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyText: { textAlign: 'center', color: colors.text.light, fontSize: 16 }
});

export default SearchScreen;
