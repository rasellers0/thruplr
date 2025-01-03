import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, FAB, TextInput } from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const filters:any = {
    distance: 'Distance',
    age: 'Age',
    genders: 'Genders',
    relationship_types: 'Relationship Type',
    poly_size: 'Polycule Size'
}

const UserData:any = {
    userID: 0,
    userName: 'rasellers0',
    firstName: 'Ryan',
    middleName: 'Alexander',
    lastName: 'Sellers',
    accountType: 'single',
    age: 38,
    location: 'Montgomery, Al',
    gender: 'he/him',
    sexuality: 'straight'
}

const filterValues:any = {
    distance_min: '5',
    distance_max: '25',
    age_min: '18',
    age_max: '65',
    genders: [],
    relationship_types: [],
    poly_size_min: '1',
    poly_size_max: '5'
}

let filterKeys = Object.keys(filters);
let genderOptions = ['Male', 'Female', 'Non-Binary', 'Agender', 'Transgender', 
                        'Trans Masculine', 'Trans Feminine', 'Something Else'];
let relationshipOpts = ['Open Relationship', 'Commited Polycule', 'Ethically Non-Monogamous', 
                            'Bedroom partner', 'Something Else'];

function FilterGroup(filterKey:any) {
    return (
        <View>
            <Text style={styles.filterTitle}>{getFilterName(filterKey)}</Text>
            {
                !['genders', 'relationship_types'].includes(filterKey.filterName) ? 
                <RangeFilter placeholder={filterKey.filterName} /> : 
                <MultiSelectFilter filterName={filterKey.filterName} />
            }
            {/* {
                filterKey.filterName === 'age' && 
                (filterValues.age_min !== null && filterValues.age_min !== '' )
                ? <AgeRangeWarningComponent /> : <View />
            } */}
        </View>
    )
}

function AgeRangeWarningComponent(MinAge:any) {
    let ageVal = MinAge.MinAge;
    if(ageVal !== null && ageVal !== '' && UserData.age - Number(filterValues.age_min) >= 20){
        return (
            <View>
                <Text style={styles.ageWarning}>
                    Don't be creepy. Pick a value more appropriate to your age.
                </Text>
            </View>
        )
    } else {
        return (
            <View />
        )
    }
}

function RangeFilter(placeholder?:any) {
    let pholder = JSON.parse(JSON.stringify(placeholder.placeholder))
    let valueMin = pholder + '_min';
    let valueMax = pholder + '_max';
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    useEffect(() => {setMinValue(filterValues[valueMin])}, [filterValues[valueMin]]);
    useEffect(() => {setMaxValue(filterValues[valueMax])}, [filterValues[valueMax]])

    function updateValues(bound:any, num:any){
        if(bound = 'min') {
            setMinValue(num);
            filterValues[valueMin] = num;
        } else {
            setMaxValue(num);
            filterValues[valueMax] = num;
        }
    }

    return (
        <View style={styles.InputGroup}>
            <TextInput placeholder={'Minimum'} style={styles.rangeInput}
                value={minValue} onChangeText={(num)=>{updateValues('min', num)}} />
            <TextInput placeholder={'Maximum'}  style={styles.rangeInput}
                value={maxValue} onChangeText={(num)=>{updateValues('max', num)}} />
            {
                pholder === 'age' ? <AgeRangeWarningComponent MinAge={minValue} /> : <View />
            }
        </View>
    )
}

function MultiSelectFilter(filterName: any) {
    const [checked, setChecked] = React.useState(false);
    let listOpts = (filterName.filterName === 'genders') ? genderOptions : relationshipOpts;
        return (
            <View style={styles.selectGroup}>
                {
                    listOpts.map((opt) => 
                        (<View style={styles.InputGroup}>
                                <Checkbox status={checked ? 'checked' : 'unchecked'}  onPress={() => {setChecked(!checked);}}/>
                                <Text>{opt}</Text>
                        </View>)
                    )
                }
            </View>
        )
}

function HorizontalRule() {
    return (
        <View style={styles.hr}/>
    )
}

function getFilterName(val: any) {return filters[val.filterName]}

function FiltersView() {
    return (
        <ScrollView style={styles.container}>
            <Text>
                {filterKeys.map((key) => (<FilterGroup key={key} filterName={key} />))}
            </Text>
            <HorizontalRule />
            <View style={styles.filterButtonContainer}>
                <FAB style={styles.filterButton} label='Apply Filters'/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {marginStart:10, marginEnd:10},
    InputGroup: {display: 'flex', flexDirection: 'row', marginBottom:10, flexWrap:'wrap', alignItems:'center'},
    selectGroup: {display: 'flex', flexDirection: 'row', marginBottom:10, flexWrap:'wrap',
        borderWidth: 1, borderColor: 'mediumvioletred', borderRadius: 10},
    rangeInput: {marginStart: 5, marginEnd:5, width: SCREEN_WIDTH/2 - 20, 
        borderWidth: 1, borderColor: 'mediumvioletred', borderRadius:15} ,
    filterTitle: {fontSize: 20, fontWeight: '400', marginLeft:5, marginBottom:5},
    filterButton: {width: SCREEN_WIDTH /2, marginBottom:10 },
    filterButtonContainer: {width:SCREEN_WIDTH, flexDirection:'row', flex:1, justifyContent:'flex-end', 
        paddingEnd:25},
    hr: {borderBottomColor: 'black', borderBottomWidth: 2, marginBottom:10 },
    ageWarning: {color:'darkred'}

  })

export default FiltersView;