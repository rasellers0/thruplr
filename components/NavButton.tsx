import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { FAB,Card } from "react-native-paper";



type NavButtonProps = PropsWithChildren<{color?:string, title:string, press:any, style?:any}>;

export default function NavButton({children, color, title, press, style}:NavButtonProps): JSX.Element {
    if(style === null || style === undefined){
        style = styles.roundedButtons;
    }
    return (
        <View >
            <Card.Actions>
                <FAB style={style} label={title} onPress={press} color={color}/>
            </Card.Actions>
        </View>
    );
}

const styles = StyleSheet.create({
    roundedButtons: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray",
                     textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center'},
  });