import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const filters:any = {
    distance: 'Distance',
    age: 'Age',
    genders: 'Genders',
    relationship_types: 'Relationship Type',
    poly_size: 'Polycule Size'
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
        </View>
    )
}

function RangeFilter(placeholder?:any) {
    let pholder = JSON.parse(JSON.stringify(placeholder.placeholder)).filterName
    return (
        <View style={styles.InputGroup}>
            <TextInput placeholder={'Minimum'} style={styles.rangeInput}
                value={''} onChangeText={()=>{}} />
            <TextInput placeholder={'Maximum'}  style={styles.rangeInput}
                value={''} onChangeText={()=>{}} />
        </View>
    )
}

function MultiSelectFilter(filterName: any) {
    const [checked, setChecked] = React.useState(false);
    console.log("filterName is: " + JSON.stringify(filterName))
    let listOpts = (filterName.filterName === 'genders') ? genderOptions : relationshipOpts;
        return (
            <View style={styles.selectGroup}>
                {
                    listOpts.map((opt) => 
                        (<View style={styles.InputGroup}>
                                <Checkbox status={'checked'}  onPress={() => {setChecked(!checked);}}/>
                                <Text>{opt}</Text>
                        </View>)
                    )
                }
            </View>
        )
}

function getFilterName(val: any) {return filters[val.filterName]}

function FiltersView() {
    return (
        <View style={styles.container}>
            <Text>
                {filterKeys.map((key) => (<FilterGroup filterName={key} />))}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {marginStart:10, marginEnd:10},
    InputGroup: {display: 'flex', flexDirection: 'row', marginBottom:10, flexWrap:'wrap'},
    selectGroup: {display: 'flex', flexDirection: 'row', marginBottom:10, flexWrap:'wrap',
        borderWidth: 1, borderColor: 'mediumvioletred', borderRadius: 10},
    rangeInput: {marginStart: 5, marginEnd:5, width: SCREEN_WIDTH/2 - 20},
    filterTitle: {fontSize: 20, fontWeight: '400', marginLeft:5, marginBottom:5}

  })

export default FiltersView;