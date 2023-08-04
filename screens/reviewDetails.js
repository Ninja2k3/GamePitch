import { StyleSheet,View,Text,Button,Image } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "./card";
export default function Review({route,navigation}){
    const rating = route.params.rating
    const images = {
        ratings:{
            '1':require('../assets/rating-1.png'),
            '2':require('../assets/rating-2.png'),
            '3':require('../assets/rating-3.png'),
            '4':require('../assets/rating-4.png'),
            '5':require('../assets/rating-5.png'), 
        }
    }

    return(
        <View style={globalStyles.container}>
            <Card>
                <Text style={globalStyles.titleText}>{route.params.title}</Text>
                <Text style={globalStyles.paragraph}>{route.params.body}</Text>
                <View style={style.rating}>
                    <Text>
                        GamePitch rating:
                        <Image source={images.ratings[rating]} />
                    </Text>
                </View>
            </Card>
        </View>
    )
}


const style = StyleSheet.create({
    rating:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:16,
        marginTop:16,
        borderTopWidth:1,
        borderTopColor:'#eee'
    }
})