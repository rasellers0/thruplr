import { PropsWithChildren } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Card } from "react-native-paper";



type NavButtonProps = PropsWithChildren<{title: string, press: any, style?:any}>;

export default function NavButton({children, title, press, style}:NavButtonProps): JSX.Element {
    if(style === null || style === undefined){
        style = styles.roundedButtons;
    }
    return (
        <View style={style}>
            <Card.Actions>
                <Button  title={title} onPress={press} color='transparent'/>
            </Card.Actions>
        </View>
    );
}

const styles = StyleSheet.create({
    roundedButtons: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray",
                     textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center'},
  });