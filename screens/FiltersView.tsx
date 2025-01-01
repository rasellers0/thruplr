import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const filters = {
    distance_min: 'Minimum Distance',
    distance_max: 'Maximum Distance',
    age_min: 'Minimum Age',
    age_max: 'Maximum Age',
    genders: 'Genders',
    relationship_type: 'Relationship Type',
    poly_size_min: 'Minimum Polycule Size',
    poly_size_max: 'Maximum Polycule Size'
}

let filterKeys = Object.keys(filters);
let genderOptions = ['Male', 'Female', 'Non-Binary', 'Agender', 'Transgender', 
                        'Trans Masculine', 'Trans Feminine'];

function filterGroup(filterName:any) {
    return (
        <View>
            <Text>{filterName}</Text>
            {
                !['genders', 'relationship_types'].includes(filterName) ? <RangeFilter /> : <MultiSelectFilter />
            }
        </View>
    )
}

function RangeFilter(placeholder?:any) {
    return (
        <View style={styles.rangeInput}>
            <TextInput placeholder={placeholder + '_min'} value={'null'} onChangeText={()=>{}} />
            <TextInput placeholder={placeholder + '_max'} value={'null'} onChangeText={()=>{}} />
        </View>
    )
}

function MultiSelectFilter() {
    return (
        <View>

        </View>
    )
}

function FiltersView() {
    return (
        <View style={styles.container}>
            <Text>
                Test
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {marginStart:10, marginEnd:10},
    rangeInput: {display: 'flex', flexDirection: 'row'}
  })

export default FiltersView;