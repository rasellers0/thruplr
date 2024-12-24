import React, { useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Checkbox } from 'react-native-paper';
import NavButton from '../components/NavButton';

let genders:any = {
    'male': false,
    'female': false,
    'non-binary': false,
    'agender': false,
    'transgender': false,
    'trans male': false,
    'trans female': false,
    'something else': false
}

let orientation = {
    'heterosexual': false,
    'homosexual': false,
    'bisexual': false,
    'pansexual': false,
    'asexual': false,
    'demisexual': false
}
let userRelationship = {
    'single': false,
    'couple': false,
    'group': false
}

let lookingFor = {
    'singles': false,
    'couples': false,
    'groups': false,
}

let relationshipStyle= {
    'single': false,
    'couple': false,
    'throuple': false,
    'open relationship': false,
    'occaisional partner': false,
    'polyamory': false,
    'ethical non-monogamy': false
}

let userModel:any = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    genders: [],
    orientation: [],
    relationship: []
};

export default function ProfileCreation({ route, navigation }: any): JSX.Element {
    const { userID, userObj } = route.params; 
    console.log("Params passed from Registration: " + route.params['userID'], route.params['userObj'])
    userModel = route.params['userObj']
    return (
        <SafeAreaView style={styles.page}>
            <ScrollView>
                <View style={{flex:6, backgroundColor:'azure'}}>
                    <Text style={styles.header}>Select options below for gender, orientation and reslationship type:</Text>
                    <View style={{flex:6, flexDirection:'row'}}>
                        <CheckBoxList listItems={genders} label="My Gender Is: "></CheckBoxList>
                    </View>
                    <View style={{flex:6, flexDirection:'row'}}>
                        <CheckBoxList listItems={orientation} label="I am:"></CheckBoxList>
                    </View>
                    <View style={{flex:6, flexDirection:'row'}}>
                        <CheckBoxList listItems={relationshipStyle} label="I'm Looking for a:"></CheckBoxList>
                    </View>
                    <View style={{flex: 6, flexDirection:'row', justifyContent:'flex-end', alignItems: 'center', marginRight:10}}>
                        <NavButton style={styles.backButton} title="Back" press={() => navigation.navigate('Registration')}></NavButton>
                        <NavButton style={styles.button} title="Continue" press={() => navigation.navigate('Profile creation')}></NavButton>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

function CheckBoxList(dataObj:any):JSX.Element {
    let listItems = Object.keys(dataObj.listItems)

    return (
        <View style={{flex:6, flexDirection:'row'}}>
            <Text style={{flex: 2, fontWeight:'bold', marginLeft:10}}>{dataObj.label}</Text>
            <View style={{flex:4, marginLeft: 10}}>
                <FlatList data={listItems} scrollEnabled={false}
                    renderItem={({item}) => <CheckBoxRow label={item}></CheckBoxRow>}>
                </FlatList>
            </View>
        </View>
    )
}

function CheckBoxRow(label:any): JSX.Element {
    const [checked, setChecked] = React.useState(false);
    let labelVal = String(Object.values(label));
    let questionSet = getCurrentQuestionSet(labelVal);
    useEffect(() => {
        questionSet[labelVal] = checked;
        // if(questionSet === genders){userModel.genders.push(questionSet[labelVal])}
      });

    let onCheckedCallback = function(chk:any){
        setChecked(chk == false ? true : false);
        genders[labelVal as keyof typeof genders] = chk
    };
    return (
        <View style={styles.row}>
            <Text style={{flex: 4, backgroundColor:'white'}}>{labelVal}</Text>
            <View style={{flex: 1, backgroundColor:'yellow'}}>
                <Checkbox status={checked ? 'checked' : 'unchecked'} 
                onPress={() => {onCheckedCallback(checked)}}/>
            </View>
        </View>
    )
}

function getCurrentQuestionSet(item:any){
    if(['male', 'female', 'non-binary', 'agender', 'transgender', 'trans male', 'trans female', 'something else']
    .includes(item)){
        return genders;
    }
    if(['heterosexual', 'homosexual', 'bisexual', 'pansexual', 'asexual', 'demisexual'].includes(item)){
        return orientation;
    }
    if(['single', 'couple', 'throuple', 'open relationship', 'occaisional partner', 'polyamory', 'ethical non-monogamy'].includes(item)){
        return relationshipStyle;
    }
}

const styles = StyleSheet.create({
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
        textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center', width:150},
    backButton: {borderRadius: 20, overflow: 'hidden', backgroundColor : "lightpink", marginTop:15, 
        textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center', width:150},
    page: {color: 'azure', flex: 5, flexDirection:'row', overflow: 'scroll'},
    row: {flexDirection: "row"},
    header : {fontSize : 20, fontWeight : "bold", /*textTransform : "uppercase",*/ textAlign: "center",
        paddingVertical : 10, color : "black", maxHeight:100, marginLeft:10, marginRight:10},
  });