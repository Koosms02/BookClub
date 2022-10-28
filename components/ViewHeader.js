import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation , useRoute} from '@react-navigation/native'
import { statusBarHeight, width ,height } from '../assets/constants/parameter'
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font/build/FontHooks';


const ViewHeader = ({heading}) => {

  const navigation = useNavigation()
  const route = useRoute()

  const [fontLoading] = useFonts({
    "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
    "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
    "MoonBold":require('../assets/constants/Font/MoonBold.otf')
  })

  if (!fontLoading) {
    return null;
  }
  return (

    <View style={{width:'90%' ,backgroundColor:'white' , height:50,borderRadius:20 , flexDirection:'row' ,alignItems:'center',paddingLeft:15, justifyContent:'flex-start'}}>
            <TouchableOpacity 
                onPress={
                    ()=>{
                        navigation.navigate('home')
                    }
                }
                style={{width:'10%' , height:'100%' , alignItems:'center' , justifyContent:'center'}}>
                <MaterialIcons name="arrow-back-ios" size={25} color='#2196F3'/>
            </TouchableOpacity>
            <View style={{width:'90%' , height:'100%' , justifyContent:'center'}}>
                <Text 
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{fontFamily:'MoonBold' , color:'#2196F3'}}>
                     {heading}
                </Text>
            </View>
        </View>
  )
}

export default ViewHeader