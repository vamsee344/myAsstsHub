import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getProperties } from '../../api/property.api';
import { AppButton } from '../../components/shared/AppComponents';

const PropertyDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;

  // Retrieve matching item from cache/fetch query
  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties()
  });

  const property = properties?.find((p: any) => p.id === id) || {
    id,
    title: 'Skyline Heights Penthouse',
    price: 1250000,
    city: 'San Francisco',
    address: '452 Ocean Avenue, Tower A, Penthouse 2',
    description: 'Breathtaking duplex penthouse with panoramic views of the city skyline, featuring an open-concept kitchen, custom Italian marble countertops, and private rooftop deck.'
  };

  const handleShare = () => {
    Alert.alert('Shared', `Link to "${property.title}" has been copied.`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navBack}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.rightNav}>
          <TouchableOpacity onPress={handleShare}>
            <Text style={{ fontSize: 20 }}>🔗</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagePlaceholder} />

        <View style={styles.content}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.price}>${property.price?.toLocaleString()}</Text>
          <Text style={styles.address}>📍 {property.address || property.city}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>

          <AppButton
            title="Book Visit"
            onPress={() => navigation.navigate('Booking', { propertyId: property.id, propertyTitle: property.title })}
            style={styles.bookBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  navBack: {
    fontSize: 15,
    color: '#1A56DB',
    fontWeight: '600',
  },
  rightNav: {
    flexDirection: 'row',
  },
  container: {
    paddingBottom: 40,
  },
  imagePlaceholder: {
    height: 220,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A56DB',
    marginBottom: 8,
  },
  address: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  bookBtn: {
    marginTop: 24,
  }
});

export default PropertyDetailScreen;

