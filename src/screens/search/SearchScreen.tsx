import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { SearchBar } from '../../components/inputs/SearchBar';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/loaders/Loader';
import { EmptyView } from '../../components/states/EmptyView';
import { Icon } from '../../components/common/Icon';
import { dataService } from '../../services/data/dataService';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchResultItem, SearchCategory } from '../../types/search';
import { theme } from '../../theme';

const CATEGORIES: { label: string; value: SearchCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Telemetry', value: 'telemetry' },
  { label: 'Device', value: 'device' },
  { label: 'Guides', value: 'guides' },
  { label: 'Reports', value: 'reports' },
];

export const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches] = useState<string[]>([
    'AQI Guide',
    'SpO2 Calibration',
    'Asthma Moisture levels',
  ]);

  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await dataService.search(debouncedQuery, selectedCategory);
      setResults(data);
    } catch (e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, selectedCategory]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.screenTitle}>Search Telemetry & Guides</Text>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search respiratory metrics, sensors, pollen..."
        style={styles.searchBar}
      />

      {/* Category Tag Pills */}
      <View style={styles.categoriesRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.value}
            style={[
              styles.categoryPill,
              selectedCategory === cat.value && styles.selectedCategoryPill,
            ]}
            onPress={() => setSelectedCategory(cat.value)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.value && styles.selectedCategoryText,
              ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Searches Header if query is empty */}
      {!query && recentSearches.length > 0 && (
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          <View style={styles.recentTagsRow}>
            {recentSearches.map((term, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentTag}
                onPress={() => handleRecentClick(term)}>
                <Icon name="search" size={12} color={theme.colors.textMuted} style={styles.tagIcon} />
                <Text style={styles.recentTagText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Search Results List */}
      {loading ? (
        <Loader style={styles.loader} />
      ) : results.length === 0 ? (
        <EmptyView
          title="No Matching Results"
          message={`We couldn't find any telemetry records matching "${query}".`}
          iconName="search"
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              style={styles.resultCard}
              onPress={() =>
                navigation.navigate('Details', {
                  itemId: item.id,
                  title: item.title,
                  category: item.category,
                })
              }>
              <View style={styles.resultRow}>
                <View style={styles.resultContent}>
                  <View style={styles.badgeRow}>
                    <Text style={styles.categoryBadge}>{item.category.toUpperCase()}</Text>
                    {item.badge && <Text style={styles.tagBadge}>{item.badge}</Text>}
                  </View>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
                </View>
                <Icon name="chevronRight" size={20} color={theme.colors.textMuted} />
              </View>
            </Card>
          )}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  screenTitle: {
    ...theme.typography.h2,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  searchBar: {
    marginBottom: theme.spacing.md,
  },
  categoriesRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  categoryPill: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.xs,
  },
  selectedCategoryPill: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
  },
  selectedCategoryText: {
    color: theme.colors.textInverse,
  },
  recentContainer: {
    marginBottom: theme.spacing.lg,
  },
  recentTitle: {
    ...theme.typography.captionMedium,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  recentTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceElevated,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  tagIcon: {
    marginRight: 4,
  },
  recentTagText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  loader: {
    marginTop: theme.spacing.xxxl,
  },
  resultCard: {
    marginVertical: theme.spacing.xs,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryBadge: {
    ...theme.typography.small,
    fontSize: 10,
    color: theme.colors.primary,
    fontWeight: '700',
    marginRight: theme.spacing.xs,
  },
  tagBadge: {
    ...theme.typography.small,
    fontSize: 10,
    color: theme.colors.secondary,
    backgroundColor: theme.colors.secondaryLight,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  resultTitle: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  resultSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});
