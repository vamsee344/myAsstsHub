import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getProperties } from '../../api/property.api';
import { getPropertyCategories } from '../../api/auth.api';
import { SkeletonLoader } from '../../components/shared/AppComponents';

const PropertiesScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'sale' | 'rent' | ''>('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Queries
  const { data: propertiesData, isLoading: isPropLoading, refetch } = useQuery({
    queryKey: ['properties', { type: selectedType, category: selectedCategory, search }],
    queryKeyHashFn: () => `properties-${selectedType}-${selectedCategory}-${search}`,
    queryFn: () => getProperties(1, 10, selectedCategory, selectedType, '', '', search)
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getPropertyCategories()
  });

  const renderPropertyItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.propCard}
      onPress={() => navigation.navigate('PropertyDetail', { id: item.id })}
    >
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>${item.price?.toLocaleString()}{item.type === 'rent' ? '/mo' : ''}</Text>
        <Text style={styles.city}>📍 {item.city || 'San Francisco, CA'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Properties</Text>

        {/* Search bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by city, title or zip..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />

        {/* Category filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          <TouchableOpacity
            style={[styles.catTab, selectedCategory === '' ? styles.activeTab : null]}
            onPress={() => setSelectedCategory('')}
          >
            <Text style={[styles.catText, selectedCategory === '' ? styles.activeTabText : null]}>ALL</Text>
          </TouchableOpacity>
          {categoriesData?.map((cat: any) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catTab, selectedCategory === cat.slug ? styles.activeTab : null]}
              onPress={() => setSelectedCategory(cat.slug)}
            >
              <Text style={[styles.catText, selectedCategory === cat.slug ? styles.activeTabText : null]}>
                {cat.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sale / Rent selector tabs */}
        <View style={styles.tabRow}>
          {(['', 'sale', 'rent'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedType === tab ? styles.activeTab : null]}
              onPress={() => setSelectedType(tab)}
            >
              <Text style={[styles.tabText, selectedType === tab ? styles.activeTabText : null]}>
                {tab === '' ? 'ANY PURPOSE' : tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Grid List */}
        {isPropLoading ? (
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={item => item.toString()}
            renderItem={() => <SkeletonLoader />}
          />
        ) : (
          <FlatList
            data={propertiesData || []}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPropertyItem}
            onRefresh={refetch}
            refreshing={false}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No property matching guidelines.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 12,
  },
  searchBar: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    marginBottom: 12,
    color: '#111827',
  },
  catScroll: {
    maxHeight: 40,
    marginBottom: 12,
  },
  catTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    height: 30,
  },
  catText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeTab: {
    backgroundColor: '#1A56DB',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  propCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 110,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  price: {
    fontSize: 13,
    color: '#1A56DB',
    fontWeight: '700',
    marginTop: 2,
  },
  city: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
  }
});

export default PropertiesScreen;

