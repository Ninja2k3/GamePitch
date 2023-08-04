import { StyleSheet,View,Text,ScrollView,FlatList, Button,Image,TouchableOpacity,TouchableWithoutFeedback,Pressable,Modal,Clipboard, Linking } from "react-native";
import { globalStyles } from "../styles/global";
import { myFetchGetRequest } from "../MyFetchApiRequests";
import { useEffect, useState } from "react";
import FlatButton from "./button";
import {MaterialIcons} from '@expo/vector-icons'
import Home from "./home";
import {Video} from 'expo-av'
import React from "react";
import Card from "./card";
import { WebView } from 'react-native-webview';

export default function About(){   
    const [count,setCount] = useState(0)
    const [data,setData] = useState([])
    
    const [modalData, setModalData] = useState({"competition": "NETHERLANDS: Supercup", "competitionUrl": "https://www.scorebat.com/embed/competition/netherlands-supercup/?token=MTAxMTQwXzE2OTExODc3MDhfMDg1ZDgyM2ZkM2ZjY2ViZTVkYzBlYjRkZTg5YWZkMmJjYWExMzUxYQ==", "date": "2023-08-04T18:00:00+0000", "matchviewUrl": "https://www.scorebat.com/", "thumbnail": "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp", "title": "Feyenoord - PSV", "videos": [{"embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.youtube.com/embed/XSliaQ3a_5Y' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>", "id": "64cd7739a645f", "title": "Highlights"}]});
    const [modalOpen,setModalOpen] = useState(false)

    const handleClick = async ()=>{
        setModalOpen(true)
        const url = 'https://www.scorebat.com/video-api/v3/feed/?token=MTAxMTQwXzE2OTExNzMyNTRfMzVhMjExNTM5ZjllMzBmZTZkMjA4YjgyZGE3OTI0ODRmMmI5MDc3MQ=='
        let result = await fetch(url)
        result = await result.json()
        setData(result.response)
    }

    const closer=()=>{
        setModalOpen(false)
    }

    useEffect(()=>{
        handleClick()
    },[])

    return(
        <ScrollView >
            
            <View style={globalStyles.container}>
            <View style={{flexDirection:'row',flex:1,alignItems:'flex-end',justifyContent:'space-around',marginTop:-20,marginBottom:20}}>
                <FlatButton text='Previous' onPress={()=>setCount(()=>count-20)}/>
                <FlatButton text='Next' onPress={()=>setCount(()=>count+20)} />
            </View>
            
            {data?
            <View>
                {data.slice(count,count+8).map((item)=>
                    <View>

                        <TouchableOpacity onPress={()=>{
                            setModalData(()=>item);
                            setModalOpen(()=>true)}}>
                        <Card>
                        <Text style={globalStyles.titleText}>
                            {item.title}
                        </Text>
                        <Text style={globalStyles.errorText}>
                            {item.competition}
                        </Text>
                        <Text style={globalStyles.paragraph}>
                            {item.date.slice(0,10)}
                        </Text>
                        <Text style={globalStyles.paragraph}>
                            {item.date.slice(11,19)}
                        </Text>
                        <Image
                        source={{uri:item.thumbnail}}
                        style={globalStyles.img}
                        />

                        <Modal visible={modalOpen} onRequestClose={() => setModalOpen(false)}>
                            <FlatButton style={{zIndex:-1}} text='close' onPress={closer}/>
                            <TouchableOpacity onPress={()=>Linking.openURL(modalData.matchviewUrl)}>
                                <Image
                                    source={{uri:'https://d37kf7rs4g1hyv.cloudfront.net/scorebat/og-default-min.png'}}
                                    style={{width:300,height:100,borderRadius:10,alignSelf:'center',marginTop:'10%'}}
                                    />
                                 
                            </TouchableOpacity>
                            <WebView
                                    scalesPageToFit={false}
                                    bounces={false}
                                    style={{ height: 600, width: '100%',marginTop:'20%' }}
                                    source={{
                                        html: `${modalData.videos[0].embed}`,
                                    }}
                                    automaticallyAdjustContentInsets={false}
                                    />
                           {console.log(modalData)}
                            

                        </Modal>

                        </Card>
                        </TouchableOpacity>
                        
                    </View>
                )}
            </View>
            :null}

            <View style={{flexDirection:'row',flex:1,alignItems:'flex-end',justifyContent:'space-around',marginTop:20,marginBottom:20}}>
                <FlatButton text='Previous' onPress={()=>setCount(()=>count-8)}/>
                <FlatButton text='Next' onPress={()=>setCount(()=>count+8)} />
            </View>
            </View>

        </ScrollView>
       
        )
}
 
