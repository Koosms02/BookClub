import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import Home from '../screens/Home'
import Card from '../screens/Card'
import AsyncStorage from '@react-native-async-storage/async-storage'


const stack = createNativeStackNavigator()
const StackNavigation = () => {
    const [firstLaunch , setFirstLaunch] = React.useState(null)
    const HAS_LAUNCHED = 'hasLaunched'
    
    React.useEffect(
    ()=>{
         async function setLaunch(){
           AsyncStorage.setItem(HAS_LAUNCHED ,'true')
        }
        setLaunch()
    },[])

    React.useEffect(
        ()=>{
            async function getLaunch(){
                setFirstLaunch(await AsyncStorage.getItem(HAS_LAUNCHED))
            }
            getLaunch()
        }
    )

    if(firstLaunch === null){
        return (
            <View>
                <ActivityIndicator size={20}/>
            </View>)
    }else if(firstLaunch === true){
        return (
            <stack.Navigator>
                <stack.Screen name ="splash" component={Splash} options={{headerShown:false}}/>
                <stack.Screen name ="home" component={Home} options={{headerShown:false}}/>
                <stack.Screen name ="card" component={Card} options={{headerShown:false}}/>
            </stack.Navigator>
          )
    }else {
        
        return (
            <stack.Navigator>
                <stack.Screen name ="home" component={Home} options={{headerShown:false}}/>
                <stack.Screen name ="card" component={Card} options={{headerShown:false}}/>
            </stack.Navigator>
          )
    }
}

export default StackNavigation