import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal, Button } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font/build/FontHooks'
import {  width ,height } from '../assets/constants/parameter'





const CardView = ({dark , setDark , ideaContent }) => {


    const [fontLoading] = useFonts({
      "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
      "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
      "MoonBold":require('../assets/constants/Font/MoonBold.otf')
    })
  
    if (!fontLoading) {
      return null;
    }

    

  return (
    <View style={{width:width , height:height}}>

        <View style={dark === true ?({width:width*0.9 , height:height*0.78,backgroundColor:'black' , borderRadius:20 , marginTop:20}):({width:width*0.9 , height:height*0.78  ,backgroundColor:'white' , borderRadius:20 , marginTop:20})}>
                
            {/* The topic  */}
            <View style={{padding:10,flexDirection:'row' , width:'100%',height:70, backgroundColor:'white' , justifyContent:'space-between', borderTopRightRadius:20 ,  borderTopLeftRadius:20}}>
                <View 
                    style={{ width:'90%', justifyContent:'center' , height:'100%' }}>
                        <ScrollView contentContainerStyle={{alignItems:'center'}} horizontal={true}>
                            <Text numberOfLines={1} style={{fontWeight:"bold", fontSize:18}}>{ideaContent[0]} </Text>
                        </ScrollView>
                </View>
                <TouchableOpacity
                style={{width:'10%' , height:'100%' , justifyContent:'center'}}
                onPress={() =>{
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
            showsVerticalScrollIndicator={false}
            initialNumToRender={4}
            renderItem={({item , index})=>(
                <View style={{paddingLeft:10 , paddingBottom:8 , paddingRight:10 ,flexDirection:'row' , alignItems:'center'}}>
                    {/* {dark === true?(index !== 0 ?(<View style={{backgroundColor:'white' , height:'40%' , width:'2%' ,borderRadius:50 ,paddingLeft:10 , marginRight:10 , marginTop:8}}></View>):(<Text></Text>)):(index!==0?(<View style={{backgroundColor:'black' , height:'40%' , width:'2%' ,borderRadius:50}}></View>):(<View></View>))} */}
                    {dark === true?(index !== 0 ?(<Text style={{color:'white' , fontSize:18}}>{item}</Text>):(<Text></Text>)):(index!==0?(<Text style={{color:'black' , fontSize:18}}>{item}</Text>):(<Text></Text>))}
                </View>
            )}
           />
            
      </View>
      
    </View>
  )
}

export default CardView