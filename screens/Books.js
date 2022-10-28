import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import React, {useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons'
import { statusBarHeight, width ,height } from '../assets/constants/parameter'

//import from firebase
import {collection, doc , DocumentSnapshot, query, where, getDocs , getFirestore} from "firebase/firestore"
import {db} from '../Api/Firebase/Firebase'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native'


const Books = () => {
    //fetch books depending on the categories

    const route = useRoute()
    const navigation = useNavigation()
    const currentRoute = route.params.name
    const color = route.params.color
    const header = route.params.header
    const [DataFetched ,setDataFetched] = useState(false)
    
    //setting a list to hold document
    const [BookList , setBookList] = useState([])
    const [Chapters , setChapters] = useState([])

    //setting up collections 
   async function QueryFunction (doc){
        const c = collection(db,doc)
        const querySnapShot = await getDocs(c)
        var list =[]
        querySnapShot.forEach((doc)=>{
          list.push(doc.data())

        })
        setBookList(list)
   }
   function HandleData(){
    if(DataFetched === true){
        console.log("inside data fetched")
        // console.log(BookList)
        var Chapter=[]
        for(var i = 0 ; i < BookList.length ; i++){
            Chapter.push(BookList[i].Chapters)
        }

        setChapters(Chapter)
        // console.log(Chapters)
    }
   }

    React.useEffect(()=>{
        function fetchData(){
            if(currentRoute === 'business'){
                QueryFunction('Business').then(
                    ()=>{
                        setDataFetched(true)

                    })
                
            }else if(currentRoute === 'communication'){

                QueryFunction('Comminication').then(
                    ()=>{
                        setDataFetched(true)

                    })

            }else if(currentRoute === 'discipline'){

                QueryFunction('Discipline').then(
                    ()=>{
                        setDataFetched(true)

                    })

            }else if(currentRoute === 'productivity'){

                QueryFunction('Productivity').then(
                    ()=>{
                        setDataFetched(true)

                    })

            }else if(currentRoute === 'learning'){

                QueryFunction('Education').then(
                    ()=>{
                        setDataFetched(true)

                    })

            }else if(currentRoute === 'psychology'){
                QueryFunction('Psychology').then(
                    ()=>{
                        setDataFetched(true)

                    })
            }
        }
        fetchData()
    },[])

    const [fontLoading] = useFonts({
        "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
        "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
        "MoonBold":require('../assets/constants/Font/MoonBold.otf')
      })
    
      if (!fontLoading) {
        return null;
      }
    
  return (
    <View style={{flex:1,paddingTop:10,alignItems:'center' ,backgroundColor:color }}>
        <StatusBar
                backgroundColor={color}
        />
        <View style={{width:'90%' ,backgroundColor:'white' , height:50,borderRadius:20 , flexDirection:'row' ,alignItems:'center',paddingLeft:15, justifyContent:'flex-start'}}>
             <TouchableOpacity 
                 onPress={()=>{ 
                    navigation.navigate("home")        
                }}
                style={{width:'10%' , height:'100%' , alignItems:'center' , justifyContent:'center'}}>
                <MaterialIcons name="arrow-back-ios" size={25} color='#2196F3'/>
            </TouchableOpacity>
            <View style={{width:'90%' , height:'100%' , justifyContent:'center'}}>
                <Text 
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                 style={{fontFamily:'MoonBold' , color:'#2196F3'}}>
                    {header}
                </Text>
            </View>
        </View>

        {/* tile list of books */}
       {DataFetched=== true && <FlatList
            data={BookList}
            keyExtractor={(items,index) =>(index)}
            renderItem={
                ({item})=>(
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate("card",{
                                color:color,
                                header:header,
                                Title:item.Book[1] +" by "+ item.Book[0],
                                currentRoute:currentRoute,
                                Data:Object.entries(item.Chapters)
                            
                            })
                        }}
                        style={{height:height*0.25 , width:width*0.9,borderRadius:20, marginTop:20,marginBottom:20, }}
                    >
                        <View style={{padding:15,width:'100%' , height:'100%' , borderRadius:20 , backgroundColor:item.Book[3] , paddingTop:30 }}>
                            <Text style={{fontFamily:'MoonBold'}}>{item.Book[1]}</Text>
                            <Text style={{paddingTop:10 ,fontFamily:'MoonLight' }}>by {item.Book[0]}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        />}
        {
            DataFetched === false &&
            <View style={{flex:1, justifyContent:'center' , alignItems:'center'}}>
                <ActivityIndicator size="large" color="white" />
            </View>
        }
        
    </View>
  )
}

export default Books