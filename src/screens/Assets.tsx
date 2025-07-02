// src/components/screens/Assets.tsx
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AssetCard from '../components/common/AssetCard';
import Header from '../components/common/Header';
import { assetsData } from '../data/mockData';
import { borderRadius, colors, fontSize, spacing } from '../styles/colors';
import { Asset } from '../types';

const Assets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState(assetsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredAssets(assetsData);
    } else {
      const filtered = assetsData.filter(
        asset =>
          asset.name.toLowerCase().includes(query.toLowerCase()) ||
          asset.department.toLowerCase().includes(query.toLowerCase()) ||
          asset.assetId.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredAssets(filtered);
    }
  };

  const renderAssetItem = ({item}: {item: Asset}) => (
    <AssetCard
      asset={item}
      onPress={() => console.log('Asset details:', item.id)}
    />
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="database-search" size={64} color={colors.gray[400]} />
      <Text style={styles.emptyTitle}>No Assets Found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search criteria
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex:1}} edges={['top','right','left']}>
      <View style={styles.container}>
        <Header title="Assets" />

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color={colors.gray[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search assets..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={colors.gray[500]}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Icon name="close" size={20} color={colors.gray[500]} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter-variant" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsHeader}>
          <Text style={styles.resultsText}>
            {filteredAssets.length} Assets Found
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Icon name="sort" size={16} color={colors.gray[600]} />
            <Text style={styles.sortText}>Sort</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredAssets}
          renderItem={renderAssetItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyState}
        />

        <TouchableOpacity style={styles.fab}>
          <Icon name="plus" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginRight: spacing.md,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text.primary,
  },
  filterButton: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  resultsText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  listContainer: {
    paddingBottom: spacing.xl * 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default Assets;
