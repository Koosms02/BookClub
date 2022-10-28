import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import Home from '../screens/Home'
import Card from '../screens/Card'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Books from '../screens/Books'


const stack = createNativeStackNavigator()
const StackNavigation = () => {
    const [firstLaunch , setFirstLaunch] = React.useState(false)


    React.useEffect(
        ()=>{
            const getData = async function getLaunch(){
               const l = await AsyncStorage.getItem("go")
               if(l){
                console.log("hy there")
                  setFirstLaunch(false)
               }else{
                 await AsyncStorage.setItem("go" , 'true')
               }
            }
            getData()
        

        },[])
   
   
    if(firstLaunch === true){
        return (
            <stack.Navigator>
                <stack.Screen name ="splash" component={Splash} options={{headerShown:false}}/>
                <stack.Screen name ="home" component={Home} options={{headerShown:false}}/>
                <stack.Screen name ="card" component={Card} options={{headerShown:false}}/>
                <stack.Screen name ="books" component={Books} options={{headerShown:false}}/>
            </stack.Navigator>
          )
    }else if(firstLaunch === false) {
        return (
            <stack.Navigator>
                <stack.Screen name ="home" component={Home} options={{headerShown:false}}/>
                <stack.Screen name ="card" component={Card} options={{headerShown:false}}/>
                <stack.Screen name ="books" component={Books} options={{headerShown:false}}/>
            </stack.Navigator>
          )
    }
}

export default StackNavigation