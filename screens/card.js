import { StyleSheet,View } from "react-native";

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius:6,
        elevation:3,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginVertical:15,
        width:360
    },
    cardContent:{
        marginVertical:10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }
})