import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar } from 'react-native'
import React, { useCallback, useState } from 'react'
import {useFonts} from 'expo-font/build/FontHooks'
import { statusBarHeight, width ,height } from '../assets/constants/parameter'
import { Ionicons,FontAwesome5 ,AntDesign ,MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import useData from '../Api/DataProvider';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'expo-splash-screen'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';


const Home = () => {


  const navigation = useNavigation()
 
  // storing values inside the memory

  const [fontLoading] = useFonts({
    "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
    "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
    "MoonBold":require('../assets/constants/Font/MoonBold.otf')
  })

  if (!fontLoading) {
    return null;
  }


    return (
      <View style={{flex:1,paddingTop:statusBarHeight-10,alignItems:'center' }}>
         <StatusBar backgroundColor='#BDBDBD'/>
        <View style={{padding:30,width:width*0.90, height:height*0.25 ,borderRadius:20, backgroundColor:'white' , }}>
          <Text style={{paddingTop:10,paddingBottom:10 , fontFamily:'MoonLight'}}>Hi there</Text>
          <Text style={{ fontSize:30 , fontFamily:"MoonBold"}}>Welcome</Text>
          <Text style={{paddingTop:5,fontFamily:"MoonLight" , fontWeight:'300' , fontSize:10}}> to bookclub , where you have access to summaries and concepts from wellknown books worldwide</Text>
  
        </View>
  
        {/* first row */}
        <View style={{marginTop:20,flexDirection:'row' ,justifyContent:'space-between',width:width*0.90 , height:height*0.2}}>
          <TouchableOpacity 
            onPress={()=>{

              navigation.navigate("books",{
                header:'Business , Sales and Finance',
                color:'#B39DDB',
                name:'business',
              })


            }}
            style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'#B39DDB' , borderRadius:20 ,padding:20}}>
                <MaterialCommunityIcons name="finance" size={30} />
                <Text style={{paddingTop:10,fontFamily:'MoonBold'}}>Business</Text>
                <Text style={{fontFamily:'MoonBold'}}>Sales</Text>
                <Text style={{fontFamily:'MoonBold'}}>Finance</Text>
  
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity 
          
          onPress={()=>{
            navigation.navigate("books",{
              header:'Discipline and Mindset',
              color:'gold',
              name:'discipline',
            })
          }}
          style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'gold' , borderRadius:20 ,padding:20}}>
                <FontAwesome5 name="calendar-check" size={30} />
                <Text style={{paddingTop:10,fontFamily:'MoonBold'}}>Discipline</Text>
                <Text style={{fontFamily:'MoonBold'}}>Mindset</Text>
            </View>
          </TouchableOpacity>
  
        </View>
  
        {/* second row */}
  
        <View style={{marginTop:20,flexDirection:'row' ,justifyContent:'space-between',width:width*0.90 , height:height*0.2}}>
          <TouchableOpacity 
            onPress={()=>{
              navigation.navigate("books",{
                header:'Communication , persuasion , Negotiation',
                color:'teal',
                name:'communication',
              })
            }}
            style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'teal' , borderRadius:20 ,padding:20}}>
                <FontAwesome5 name="handshake" size={30} />
                <Text style={{paddingTop:10,fontFamily:'MoonBold' , fontSize:11}}>Communication</Text>
                <Text style={{fontFamily:'MoonBold'}}>Persuation</Text>
                <Text style={{fontFamily:'MoonBold'}}>Negotiation</Text>
  
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity 
          onPress={()=>{
            navigation.navigate("books",{
                header:'Health ,Productivity and Fitness',
                color:'#EF5350',
                name:'health',

            })
          
          }}
          style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'#EF5350' , borderRadius:20 ,padding:20}}>
                < AntDesign   name="heart" size={30} />
                <Text style={{paddingTop:10,fontFamily:'MoonBold'}}>Health</Text>
                <Text style={{fontFamily:'MoonBold'}}>Productivity</Text>
                {/* <Text style={{fontFamily:'MoonBold'}}>Mindfulness</Text> */}
                <Text style={{fontFamily:'MoonBold'}}>Fitness</Text>
  
  
            </View>
          </TouchableOpacity>
  
        </View>
  
        {/* the third row */}
  
        <View style={{marginTop:20,flexDirection:'row' ,justifyContent:'space-between',width:width*0.90 , height:height*0.2}}>
          <TouchableOpacity 
          onPress={()=>{
              navigation.navigate("books",{
              header:'Learning and Science',
              color:'#F48383',
              name:'learning',
            })
          }}
          style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'#F48383' , borderRadius:20 ,padding:20}}>
                <Ionicons name="school" size={30} />
                <Text style={{paddingTop:10,fontFamily:'MoonBold'}}>Learning</Text>
                <Text style={{fontFamily:'MoonBold'}}>Science</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("books",{
              header:'Psychology,Parenting and Dating',
              color:'#29B6F6',
              name:'psychology',
            })
          }}
          style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'#29B6F6' , borderRadius:20 ,padding:20}}>
                <FontAwesome5 name="brain" size={30} />
                <Text style={{paddingTop:10,fontFamily:'MoonBold'}}>Psychology</Text>
                <Text style={{fontFamily:'MoonBold'}}>Parenting</Text>
                <Text style={{fontFamily:'MoonBold'}}>Dating</Text>
  
            </View>
          </TouchableOpacity>
  
        </View>
  
      </View>
    )
        }
export default Home