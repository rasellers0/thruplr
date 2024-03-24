import React from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Checkbox } from 'react-native-paper';

let genders = {
    'male': '',
    'female': '',
    'non-binary': '',
    'agender': '',
    'transgender': '',
    'trans male': '',
    'trans female': '',
    'something else': ''
}

let sexuality = {
    'heterosexual': '',
    'homosexual': '',
    'bisexual': '',
    'pansexual': '',
    'asexual': '',
    'demisexual': ''
}
let userRelationship = {
    'single': '',
    'couple': '',
    'group': ''
}

let lookingFor = {
    'singles': '',
    'couples': '',
    'groups': '',
}

let relationshipStyle= {
    'couple': '',
    'throuple': '',
    'open relationship': '',
    'occaisional partners': '',
    'polyamorous': '',
    'ethically non-monogamous': ''
}

export default function ProfileCreation({ navigation }: any): JSX.Element {
    const [checked, setChecked] = React.useState(false);
    return (
        <SafeAreaView style={styles.page}>
            <View style={{flex:6, backgroundColor:'azure'}}>
                <Text style={{maxHeight:70}}>Select options below for gender, sexuality and reslationship type:</Text>
                <View style={{flex:6, flexDirection:'row'}}>
                    <Text style={{flex: 1, fontWeight:'bold', marginLeft:10}}>Gender:</Text>
                    <View style={{flex: 5}}>
                        <GenderOptions></GenderOptions>
                    </View>
                </View>
                <View style={{flex:6, flexDirection:'row'}}>
                    <Text style={{flex: 1, fontWeight:'bold', marginLeft:10}}>Sexuality:</Text>


                    <View style={{flex:5, marginLeft: 10}}>
                        <FlatList data={Object.keys(sexuality)}
                        renderItem={({item}) => <CheckBoxRow label={item}></CheckBoxRow>}>

                        </FlatList>

                    </View>

{/* 
                    <View style={{flex: 1}}>
                        <SexualityOptions></SexualityOptions>
                    </View> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

function GenderOptions():JSX.Element {
    let i = 1;
    let listOpts = Object.keys(genders).map(function(gen) {
            return <CheckBoxRow key={i++} label={gen}></CheckBoxRow>
    });
    return (
        <View>
            {listOpts}
        </View>
    )
}

function SexualityOptions(): JSX.Element {
    let i = 1;
    let listOpts = Object.keys(sexuality).map(function(sx) {
            return <CheckBoxRow key={i++} label={sx}></CheckBoxRow>
    });
    return (
        <View>
            {listOpts}
        </View>
    )
}

function CheckBoxRow(label:any): JSX.Element {
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={styles.row}>
            <Text style={{flex: 4, backgroundColor:'white'}}>{Object.values(label)}</Text>
            <View style={{flex: 1, backgroundColor:'yellow'}}>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => {setChecked(!checked);}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
                     textAlign: 'center', flexDirection:'row'},
    page: {color: 'azure', flex: 5, flexDirection:'row'},
    row: {flexDirection: "row"}
  });