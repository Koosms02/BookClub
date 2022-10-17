import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {useFonts} from 'expo-font/build/FontHooks'
import { statusBarHeight, width ,height } from '../assets/constants/parameter'
import { Ionicons,FontAwesome5 ,AntDesign ,MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import useData from '../Api/DataProvider';
import { ActivityIndicator } from 'react-native';




const Home = () => {

  const navigation = useNavigation()
  const {
        isLoadedBusiness ,
        isLoadedCommunication ,
        isLoadedEducation ,
        isLoadedPsychology ,
        isLoadedProductivity ,
        isLoadedDiscipline,
        Education, Discipline, Psychology , Communication , Productivity , 
        error , F , C ,D , P ,psy,E} = useData()

  const allIsLoaded =  isLoadedBusiness &&  isLoadedCommunication &&  isLoadedEducation &&  isLoadedPsychology &&  isLoadedProductivity &&  isLoadedDiscipline

  var [BusinessArray , setBusinessArray]=useState([])
  var CommunicationArray =[]
  var EducationArray=[]
  var PsychologyArray=[]
  var ProductivityArray=[]
  var DisciplineArray=[]

  const [list ,setList ]=useState([])

  function modelData (key , title  , author , LessonArray , summary){
    // create object that containes the key , title  , author , lesson , and summary 
    console.log("modelling the data")
    return {
      key:key,
      title: title+" by "+ author,
      Lesson:LessonArray , 
      Summary:summary,
    }
  }

  
  function StoreInArray(object){
    dummyArray = []

    if(object !== {}){
     
      var key = 0 
      const l = Object.entries(object)
      for(var i = 0 ; i < l.length ;i++){
        var Data = l[i]
        for(var j = 0 ; j < Data.length; j++){
           var t = Object.entries(Data)[j]
           if(j === 1){
             var modelledData = modelData(key , t[1].Title[1], t[1].Title[0] , t[1].Lesson , t[1].Summary)
            //  console.log(modelledData)
             key+=1
           }
             
        }
      
      }
    }else{
      return("error loading the data")
    }
    // console.log(list)
  }

  const [fontLoading] = useFonts({
    "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
    "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
    "MoonBold":require('../assets/constants/Font/MoonBold.otf')
  })

  if (!fontLoading) {
    return null;
  }

  

  if(allIsLoaded && error === false ){
    return (
      <View style={{flex:1,paddingTop:statusBarHeight-10,alignItems:'center' }}>
        <View style={{padding:30,width:width*0.90, height:height*0.25 ,borderRadius:20, backgroundColor:'white' , }}>
          <Text style={{paddingTop:10,paddingBottom:10 , fontFamily:'MoonLight'}}>Hi there</Text>
          <Text style={{ fontSize:30 , fontFamily:"MoonBold"}}>Welcome</Text>
          <Text style={{paddingTop:5,fontFamily:"MoonLight" , fontWeight:'300' , fontSize:10}}> to bookclub , where you have access to summaries and concepts from wellknown books worldwide</Text>
  
        </View>
  
        {/* first row */}
        <View style={{marginTop:20,flexDirection:'row' ,justifyContent:'space-between',width:width*0.90 , height:height*0.2}}>
          <TouchableOpacity 
  
            onPress={()=>{
              
              navigation.navigate("card",{
                header:'Business , Sales and Finance',
                color:'#B39DDB',
                dataArray:F
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
          
            navigation.navigate("card",{
              header:'Discipline and Mindset',
              color:'gold',
              dataArray:D
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
              navigation.navigate("card",{
                header:'Communication , persuasion , Negotiation',
                color:'teal',
                dataArray:C
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
            navigation.navigate("card",{
              header:'Health ,Productivity and Fitness',
              color:'red',
              dataArray:P
            })
          }}
          style={{width:width*0.4 , height:'100%'}}>
            <View style={{width:'100%', height:'100%' , backgroundColor:'red' , borderRadius:20 ,padding:20}}>
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
            navigation.navigate("card",{
              header:'Education and Science',
              color:'#F48383',
              dataArray:E
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
           
            navigation.navigate("card",{
              header:'Psychology,Parenting and Dating',
              color:'#29B6F6',
              dataArray:psy
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
  }else{
    if(error === false){
      return (
        <View style={{flex:1 ,justifyContent:'center' , alignItems:'center'}}>
          <ActivityIndicator  size="large" color='black'/>
        </View>
      )
    }else{
      return (
        <View style={{flex:1,padding:20,backgroundColor:'red' , justifyContent:'center' , alignItems:'center'}}>
          <MaterialCommunityIcons name="access-point-network-off"  size={60} color="black"/>
          <Text style={{paddingTop:20 , fontFamily:'MoonBold' , textAlign:'center'}}>Error has occured , check you internet connection</Text>
          <TouchableOpacity
              style={{width:'80%' , height:50 , backgroundColor:'grey'  ,marginTop:50 , borderRadius:30 , alignItems:'center' , justifyContent:'center'}}
              onPress={() => console.log("should restart the app")}
              >
             <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}


export default Home