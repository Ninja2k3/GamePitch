import { StyleSheet,View,Text,FlatList,Modal,TouchableOpacity,TouchableWithoutFeedback,Keyboard } from "react-native";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import Card from '../screens/card';
import {MaterialIcons} from '@expo/vector-icons'
import ReviewForm from "./reviewForm";


export default function Home({navigation}){
    const [reviews,setReviews] = useState([
        {title:'Krishna Ronaldo',rating:5,body:'GOAT',key:'1'},
        {title:'Liona Messi',rating:5,body:'The real GOAT',key:'2'},
        {title:'Isagi Yoichi',rating:2,body:'Egoist',key:'3'},
    ])

    const addReview=(review)=>{
        review.key = Math.random().toString()
        setReviews((currentReviews)=>{
            return [review, ...currentReviews]
        })
        setModalOpen(false)
    }

    const [modalOpen,setModalOpen] = useState(false)

    return(
        <View style={globalStyles.container}>

            <Modal visible={modalOpen} animationType="fade">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                <MaterialIcons
            name="close"
            size={24}
            style={{...styles.modalToggle,...styles.modalClose}}
            onPress={()=>setModalOpen(false)}
            />
                    <ReviewForm addReview={addReview}/>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons
            name="add"
            size={24}
            style={styles.modalToggle}
            onPress={()=>setModalOpen(true)}
            />
            
            <FlatList
            data={reviews}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>navigation.navigate('Review details', item)}>
                    <Card>
                    <Text style={globalStyles.titleText}>{item.title}</Text>
                    </Card>
                </TouchableOpacity>
            )}/>
        </View>
    )
}

const styles=StyleSheet.create({
    modalToggle:{
        marginBottom:10,
        borderWidth:1,
        borderColor:'#f2f2f2',
        borderRadius:10,
        alignSelf:'center'
    },
    modalClose:{
        marginTop:20,
        marginBottom:0
    },
    modalContent:{
        flex:1,
    }
})