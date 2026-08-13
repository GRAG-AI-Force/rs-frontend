export type SearchCategory = 'all' | 'device' | 'telemetry' | 'reports' | 'guides';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  date?: string;
  badge?: string;
}
