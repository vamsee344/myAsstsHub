import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProperties, fetchCategories } from '../../redux/slices/propertySlice';
import PropertyCard from '../../components/common/PropertyCard';
import CategoryChip from '../../components/common/CategoryChip';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Local icon mapping for categories
const categoryIcons = {
  'House': require('../../assets/icons/house.png'),
  'Apartment': require('../../assets/icons/apartment.png'),
  'Commercial': require('../../assets/icons/commercial.png'),
  'Land': require('../../assets/icons/land.png'),
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { properties, categories, loading, error } = useSelector((state) => state.property);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const loadData = async () => {
    dispatch(fetchCategories());
    dispatch(fetchAllProperties({ page: 1, per_page: 15 }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderPropertyCard = ({ item }) => (
    <PropertyCard 
        property={item} 
        horizontal={true} 
        onPress={(id) => navigation.navigate('PropertyDetails', { propertyId: id })}
    />
  );

  const renderAdBanner = () => (
    <View style={styles.adBanner}>
      <Text style={styles.adTag}>SPONSORED</Text>
      <Text style={styles.adTitle}>Upgrade to Premium</Text>
      <Text style={styles.adSubtitle}>List your assets for free for 1 month!</Text>
      <TouchableOpacity style={styles.adButton}>
          <Text style={styles.adButtonText}>LEARN MORE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>My Assets Hub</Text>
          <Text style={styles.subGreeting}>Find your next property listing</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
           <MaterialIcons name="notifications-none" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Categories Row (Real Data) */}
      <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
              {categories.map((cat) => (
                  <CategoryChip 
                    key={cat.c_id} 
                    label={cat.category_name} 
                    icon={categoryIcons[cat.category_name]}
                  />
              ))}
          </ScrollView>
      </View>

      {/* Search Bar Placeholder */}
      <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Search')}>
        <MaterialIcons name="search" size={20} color={colors.text.light} />
        <Text style={styles.searchText}>Search for properties, locations...</Text>
      </TouchableOpacity>

      {/* Ad Section */}
      {renderAdBanner()}

      {/* Featured Properties */}
      <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>Featured Properties</Text>
         <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
         </TouchableOpacity>
      </View>

      <FlatList 
        data={properties}
        renderItem={renderPropertyCard}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
      />

      <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>Recently Added</Text>
      </View>
      
      {/* Real Feed Data */}
      {loading && !refreshing ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
      ) : (
          properties.map(item => (
              <PropertyCard 
                key={item.l_id}
                property={item}
                onPress={(id) => navigation.navigate('PropertyDetails', { propertyId: id })}
              />
          ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  notificationBtn: {
    padding: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingLeft: 20,
  },
  categoryItem: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchText: {
    marginLeft: 10,
    color: colors.text.light,
  },
  adBanner: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginBottom: 25,
  },
  adTag: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  adTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  adSubtitle: {
    color: colors.surface,
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 15,
  },
  adButton: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  adButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  viewAll: {
    color: colors.secondary,
    fontWeight: '600',
  },
  listPadding: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  card: {
    width: width * 0.7,
    backgroundColor: colors.surface,
    borderRadius: 15,
    marginRight: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardImagePlaceholder: {
    height: 150,
    backgroundColor: colors.ads.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  cardPrice: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardLocation: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  verticalCard: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 15,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 10,
      elevation: 2,
  },
  verticalCardImage: {
      width: 80,
      height: 80,
      backgroundColor: colors.ads.background,
      borderRadius: 8,
  },
  verticalCardContent: {
      marginLeft: 12,
      justifyContent: 'center',
  },
  cardLocationMeta: {
      fontSize: 12,
      color: colors.text.light,
      marginTop: 2,
  }
});

export default HomeScreen;
