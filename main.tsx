import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Card } from 'react-native-paper';
import NavButton from './components/NavButton';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';

type SectionProps = PropsWithChildren<{title: string;}>;
type NavButtonProps = PropsWithChildren<{title: string, press: any;}>;

function Section({children, title}: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const headerStyle = {};
    return (
      <View style={styles.sectionContainer}>
          <View style={{backgroundColor: '#3399ff'}} >
              <Text style={[styles.sectionTitle, {color: isDarkMode ? Colors.white : Colors.black}]}>{title}</Text>
          </View>
        
        <Text style={[styles.sectionDescription, {color: isDarkMode ? Colors.light : Colors.dark}]}>{children}</Text>
      </View>
    );
  }
  
//   function NavButton({children, title, press}:NavButtonProps, {navigation}: any): JSX.Element {
//       return (
//           <View style={styles.roundedButtons}>
//               <Card.Actions>
//                   <Button title={title} onPress={press} />
//               </Card.Actions>
//           </View>
//       );
//   }

function Main(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<undefined>();

    const getUserData = async () => {
        let rtnVal:undefined;
        try {
            const response = await fetch('http://192.168.0.196:1323/user/0');
            rtnVal= await response.json();
            setData(rtnVal);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {getUserData();}, []);
    let bgColor = isDarkMode ? Colors.black : Colors.white
    const navigation:any = useNavigation();
    return (
        <SafeAreaView style={{backgroundColor: bgColor}}> 
            {/* <Text>{defUserDataString(data)}</Text> */}
            <Card>
                <Card.Content>
                    <Section title="Thruplr">
                        Dating and networking for the polyamorous commmunity
                    </Section>
                    <NavButton title="Add a new Exercise!" press={() => navigation.navigate('Add Exercise')}></NavButton>
                    <NavButton title="Start a new workout!" press={() => navigation.navigate('Add Workout')}></NavButton>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>
                    <Section title="Workout History">Select from the list below:</Section>
                                  
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {marginTop: 32, paddingHorizontal: 24},
    sectionTitle: {fontSize: 24, fontWeight: '600'},
    sectionDescription: {marginTop: 8, fontSize: 18, fontWeight: '400'},
    highlight: {fontWeight: '700'},
    roundedButtons: {borderRadius: 20, overflow: 'hidden', 
    textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center'},
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20},
  });
  
export default Main;