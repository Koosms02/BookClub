import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal, Button } from 'react-native'
import React from 'react'
import { Foundation, MaterialIcons , Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font/build/FontHooks'
import { statusBarHeight, width ,height } from '../assets/constants/parameter'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Speech from 'expo-speech'

const CardView = ({dark , setDark , ideaContent , HowToContent ,setHowTo ,setConcept}) => {

    const navigation = useNavigation()
    const route = useRoute()
    const header= route.params.header

    // const [dark, setDark] = React.useState(true)   //should be store in the memory
   
    const [fontLoading] = useFonts({
      "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
      "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
      "MoonBold":require('../assets/constants/Font/MoonBold.otf')
    })
  
    if (!fontLoading) {
      return null;
    }

    

  return (
    <View>

        {/* name of the book and author name */}
       

        {/* idea card */}

         <View style={dark === true ?({width:width*0.9 , height:height*0.35 ,backgroundColor:'black' , borderRadius:20 , marginTop:20}):({width:width*0.9 , height:height*0.35 ,backgroundColor:'white' , borderRadius:20 , marginTop:20})}>
                
            {/* The topic  */}
            <View style={{padding:10,flexDirection:'row' , width:'100%', backgroundColor:'white' , justifyContent:'space-between', borderTopRightRadius:20 ,  borderTopLeftRadius:20}}>
                <View 
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={{   width:'80%', padding:10 ,  alignItems:'center' , justifyContent:'center'  }}>
                        <Text style={{fontFamily:'MoonBold' ,  fontSize:10}}>{ideaContent[0]} </Text>
                </View>
                {/* <View style={{flexDirection:'row' , height:'100%' , width:'23%', justifyContent:'flex-end',paddingRight:15}}>
                    <TouchableOpacity 
                    style={{justifyContent:'center'}}
                    onPress={()=>{
                        setConcept(true)
                    }}>
                            <MaterialIcons name="fullscreen" size={30}/>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity onPress={() =>{
                    if(dark === false){
                        setDark(true)
                    }else{
                        setDark(false)
                    }
                }}>
                    {
                         dark === true &&
                        <Ionicons size={25} name="moon"/>

                    }
                    {
                        dark === false &&
                        <Ionicons size={25} name="moon-outline"/>
                    }
                </TouchableOpacity>
            </View>
            {/* Contents of the topic */}
           <FlatList
            data={ideaContent}
            renderItem={({item , index})=>(
                <View style={{paddingLeft:10}}>
                    {dark === true?(index !== 0 ?(<Text style={{color:'white'}}>{item}</Text>):(<Text></Text>)):(index!==0?(<Text style={{color:'black'}}>{item}</Text>):(<Text></Text>))}
                </View>
            )}
           />
            
        </View>

     {/* How to card*/}

     <View style={dark === true ?({width:width*0.9 , height:height*0.30 ,backgroundColor:'black' , borderRadius:20 , marginTop:20}):({width:width*0.9 , height:height*0.30 ,backgroundColor:'white' , borderRadius:20 , marginTop:20})}>

    {/* The topic  */}
    <View style={{padding:10,flexDirection:'row' , width:'100%', backgroundColor:'white' ,  justifyContent:'space-between', borderTopRightRadius:20 ,  borderTopLeftRadius:20}}>
        <View style={{   width:'100%', padding:10 ,  alignItems:'center' , justifyContent:'center'  }}>
                <Text 
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={{fontFamily:'MoonBold' ,  fontSize:10}}>Apply the lesson </Text>
        </View>
        {/* <View style={{flexDirection:'row' , height:'100%' , width:'23%',  justifyContent:'flex-end',paddingRight:15}}>
        <TouchableOpacity 
        style={{justifyContent:'center'}}
        onPress={()=>{
                setHowTo(true)
        }}>
                <MaterialIcons name="fullscreen" size={30}/>
        </TouchableOpacity>
        </View> */}
  </View>
    {/* Contents of the topic */}
    <FlatList
            data={HowToContent}
            renderItem={({item})=>(
                <View style={{paddingLeft:10 , paddingTop:10}}>
                   <Text style={dark===true?({color:'white'}):({color:'black'})}>{item}</Text>
                </View>
            )}
           />
       

</View>


    </View>
  )
}

export default CardView