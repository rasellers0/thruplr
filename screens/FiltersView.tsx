import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, FAB, TextInput } from 'react-native-paper';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface Colors {
  lightBlue: string;
  pink: string;
  white: string;
  softGray: string;
  darkGray: string;
  warning: string;
}

interface FilterLabels {
  distance: string;
  age: string;
  genders: string;
  relationship_types: string;
  poly_size: string;
}

interface UserData {
  userID: number;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  accountType: string;
  age: number;
  location: string;
  gender: string;
  sexuality: string;
}

interface FilterValues {
  distance_min: string;
  distance_max: string;
  age_min: string;
  age_max: string;
  genders: string[];
  relationship_types: string[];
  poly_size_min: string;
  poly_size_max: string;
}

type FilterKey = keyof FilterValues;
type FilterValue = string | string[];

const COLORS: Colors = {
  lightBlue: '#55CDFC',
  pink: '#F7A8B8',
  white: '#FFFFFF',
  softGray: '#8E8E93',
  darkGray: '#6D6D70',
  warning: '#FF3B30'
};

const FILTERS: FilterLabels = {
  distance: 'Distance',
  age: 'Age',
  genders: 'Genders',
  relationship_types: 'Relationship Type',
  poly_size: 'Polycule Size'
};

const USER_DATA: UserData = {
  userID: 0,
  userName: 'rasellers0',
  firstName: 'Ryan',
  middleName: 'Alexander',
  lastName: 'Sellers',
  accountType: 'single',
  age: 38,
  location: 'Montgomery, AL',
  gender: 'he/him',
  sexuality: 'straight'
};

const INITIAL_FILTER_VALUES: FilterValues = {
  distance_min: '5',
  distance_max: '25',
  age_min: '18',
  age_max: '65',
  genders: [],
  relationship_types: [],
  poly_size_min: '1',
  poly_size_max: '5'
};

const GENDER_OPTIONS: readonly string[] = [
  'Male', 'Female', 'Non-Binary', 'Agender', 'Transgender',
  'Trans Masculine', 'Trans Feminine', 'Something Else'
] as const;

const RELATIONSHIP_OPTIONS: readonly string[] = [
  'Open Relationship', 'Committed Polycule', 'Ethically Non-Monogamous',
  'Bedroom Partner', 'Something Else'
] as const;

// Age Warning Component
interface AgeRangeWarningProps {
  minAge: string;
}

const AgeRangeWarning: React.FC<AgeRangeWarningProps> = ({ minAge }) => {
  const shouldShowWarning: boolean = Boolean(minAge) && 
    minAge !== '' && 
    USER_DATA.age - Number(minAge) >= 20;

  if (!shouldShowWarning) return null;

  return (
    <View style={styles.warningContainer}>
      <Text style={styles.ageWarning}>
        Don't be creepy. Pick a value more appropriate to your age.
      </Text>
    </View>
  );
};

// Range Filter Component
interface RangeFilterProps {
  filterName: string;
  filterValues: FilterValues;
  onFilterChange: (key: FilterKey, value: FilterValue) => void;
}

const RangeFilter: React.FC<RangeFilterProps> = ({ filterName, filterValues, onFilterChange }) => {
  const minKey = `${filterName}_min` as FilterKey;
  const maxKey = `${filterName}_max` as FilterKey;
  
  const [minValue, setMinValue] = useState<string>(filterValues[minKey] as string || '');
  const [maxValue, setMaxValue] = useState<string>(filterValues[maxKey] as string || '');

  useEffect(() => {setMinValue(filterValues[minKey] as string || '');}, [filterValues[minKey]]);

  useEffect(() => {setMaxValue(filterValues[maxKey] as string || '');}, [filterValues[maxKey]]);

  const updateMinValue = useCallback((value: string) => {
    setMinValue(value);
    onFilterChange(minKey, value);
  }, [minKey, onFilterChange]);

  const updateMaxValue = useCallback((value: string) => {
    setMaxValue(value);
    onFilterChange(maxKey, value);
  }, [maxKey, onFilterChange]);

  return (
    <View style={styles.rangeContainer}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Minimum" style={styles.rangeInput}
          value={minValue} onChangeText={updateMinValue} keyboardType="numeric"
          theme={{ colors: { primary: COLORS.lightBlue } }}
        />
        <TextInput placeholder="Maximum" style={styles.rangeInput} value={maxValue}
          onChangeText={updateMaxValue} keyboardType="numeric"
          theme={{ colors: { primary: COLORS.lightBlue } }}
        />
      </View>
      {filterName === 'age' && <AgeRangeWarning minAge={minValue} />}
    </View>
  );
};

interface MultiSelectFilterProps {
  filterName: 'genders' | 'relationship_types';
  filterValues: FilterValues;
  onFilterChange: (key: FilterKey, value: FilterValue) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ filterName, filterValues, onFilterChange }) => {
  const options: readonly string[] = filterName === 'genders' ? GENDER_OPTIONS : RELATIONSHIP_OPTIONS;
  const selectedValues: string[] = filterValues[filterName] || [];

  const toggleOption = useCallback((option: string) => {
    const isSelected: boolean = selectedValues.includes(option);
    const newValues: string[] = isSelected ? selectedValues.filter((item: string) => item !== option)  : [...selectedValues, option];
    
    onFilterChange(filterName, newValues);
  }, [selectedValues, filterName, onFilterChange]);

  return (
    <View style={styles.selectGroup}>
      {options.map((option: string) => (
        <View key={option} style={styles.checkboxRow}>
          <Checkbox status={selectedValues.includes(option) ? 'checked' : 'unchecked'}
            onPress={() => toggleOption(option)} color={COLORS.lightBlue}/>
          <Text style={styles.checkboxLabel}>{option}</Text>
        </View>
      ))}
    </View>
  );
};

interface FilterGroupProps {
  filterKey: keyof FilterLabels;
  filterValues: FilterValues;
  onFilterChange: (key: FilterKey, value: FilterValue) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ filterKey, filterValues, onFilterChange }) => {
  const isMultiSelect: boolean = ['genders', 'relationship_types'].includes(filterKey);
  
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterTitle}>{FILTERS[filterKey]}</Text>
      {isMultiSelect ? (
        <MultiSelectFilter filterName={filterKey as 'genders' | 'relationship_types'}
          filterValues={filterValues} onFilterChange={onFilterChange} />
      ) : (
        <RangeFilter filterName={filterKey} filterValues={filterValues} onFilterChange={onFilterChange} />
      )}
    </View>
  );
};

const HorizontalRule: React.FC = () => <View style={styles.hr} />;

const FiltersView: React.FC = () => {
  const [filterValues, setFilterValues] = useState<FilterValues>(INITIAL_FILTER_VALUES);

  const handleFilterChange = useCallback((key: FilterKey, value: FilterValue) => {
    setFilterValues((prev: FilterValues) => ({...prev, [key]: value}));
  }, []);

  const handleApplyFilters = useCallback((): void => {
    console.log('Applying filters:', filterValues);
    // Add your filter application logic here
  }, [filterValues]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {(Object.keys(FILTERS) as Array<keyof FilterLabels>).map((key: keyof FilterLabels) => (
        <FilterGroup key={key} filterKey={key} filterValues={filterValues} onFilterChange={handleFilterChange}/>
      ))}
      
      <HorizontalRule />
      
      <View style={styles.buttonContainer}>
        <FAB style={styles.applyButton} label="Apply Filters" onPress={handleApplyFilters} color={COLORS.white}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 16 },
filterGroup: { marginBottom: 20 },
filterTitle: { fontSize: 20, fontWeight: '600', color: COLORS.darkGray, marginBottom: 12 },
rangeContainer: { marginBottom: 8 },
inputGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
rangeInput: {flex: 1, marginHorizontal: 4, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.lightBlue, 
    borderRadius: 8},
selectGroup: {borderWidth: 1, borderColor: COLORS.pink, borderRadius: 12,backgroundColor: COLORS.white, padding: 8},
checkboxRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 4, marginBottom: 4},
checkboxLabel: {marginLeft: 8, fontSize: 16, color: COLORS.darkGray, flex: 1, flexWrap: 'wrap'},
warningContainer: { marginTop: 8 },
ageWarning: { color: COLORS.warning, fontSize: 14, fontStyle: 'italic' },
hr: {borderBottomWidth: 1, borderBottomColor: COLORS.softGray, marginVertical: 20},
buttonContainer: { alignItems: 'flex-end', paddingRight: 8, marginBottom: 20},
applyButton: {backgroundColor: COLORS.lightBlue, borderRadius: 16, minWidth: SCREEN_WIDTH * 0.4}
});

export default FiltersView;