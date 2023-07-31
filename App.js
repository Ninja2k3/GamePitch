import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import Home from './screens/home';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ReviewDetails from '../gamezone/screens/reviewDetails';
import About from './screens/about';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, View,Text } from 'react-native';
import { globalStyles } from './styles/global';

const getFonts = () => Font.loadAsync({
    'montserrat-regular':require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold':require('./assets/fonts/Montserrat-Bold.ttf'),
  })


export default function App() {
  
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <View style={{width:'100%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
    <Image style={{width:26,height:26,marginHorizontal:5}} source={require('./assets/heart_logo.png')}/>
    <Text style={globalStyles.titleText}>GameZone</Text>
    </View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'#eee',
      },
      headerBackVisible:false,
      headerTitle:(props)=><LogoTitle {...props} />
    }}>
     
    <Stack.Screen name="GameZone" component={Home} />
    <Stack.Screen name="Review details" component={ReviewDetails} />
  </Stack.Navigator>
  );
}



const [fontsLoaded,setFontsLoaded] = useState(false)

  

  if(fontsLoaded){
    return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';

            } else if (route.name === 'About') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })} >
      <Tab.Screen name="Home" component={MyStack} />
      <Tab.Screen name="About" component={About} options={{headerShown:true,headerStyle:{
        backgroundColor:'#eee',
      },
      headerTitle:(props)=><LogoTitle {...props} />
    }} />
    </Tab.Navigator>
    </NavigationContainer>
    )
  }
  else{
    return(
  <AppLoading
  startAsync={getFonts}
  onFinish={()=>setFontsLoaded(true)}
  onError={console.warn}
  />    
    )
  }
}
