import { View, Text, TouchableOpacity ,Modal, Button} from 'react-native'
import React, {useState } from 'react'
import { statusBarHeight, width ,height ,UNIT_ID_REWARDED,TESTUNIT_ID_REWARDED,UNIT_ID_INTERSTITIAL,TESTUNIT_ID_INTERSTITITAL} from '../assets/constants/parameter'
import {  useRoute } from '@react-navigation/native'
import {useFonts} from 'expo-font/build/FontHooks'
import { EvilIcons } from '@expo/vector-icons'
import ViewHeader from '../components/ViewHeader'
import CardView from '../components/CardView'
import { FlatList } from 'react-native'
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads'


const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true
  });

const Card = () => {

    const [dark , setDark] = useState(true)
    const route = useRoute()
    const header= route.params.header
    const color = route.params.color
    const Data = route.params.dataArray
    const [Index , setIndex] = useState({
        Size:Object.entries(Data).length,
        I:1
    })
    const [interstitialCounter ,setInterstitialCounter] = useState(0)
    const [rewardedCounter , setRewardedCounter] = useState(0)

    const [Concept , setConcept] = useState(false)  
    const [howTo , setHowTo] = useState(false)     


    const [ads ,setAds] = useState(true)
    
    const [pos , setPos] = useState(0)
    const flatListRef = React.useRef()

    //  load interstitial
    async function loadInterstitials(){

        console.log("-------hello world")
        const  unsubLoaded  = interstitial.addAdEventListener(
            AdEventType.LOADED,
            ()=>
                console.log("loaded correctly")
            
        )
        const onSubClosed =  interstitial.addAdEventListener(
            AdEventType.CLOSED,
            ()=>interstitial.load()
            
        )

        interstitial.load()

        return ()=>{
            unsubLoaded , 
            onSubClosed
        }
    }
    //load rewarded
    React.useEffect(()=>{
        if(interstitialCounter ===2){
            console.log(interstitialCounter)
            const interstitial = loadInterstitials()
            setInterstitialCounter(0)
            return interstitial
        }
        
        
    },[pos])

    React.useEffect(()=>{
        if(flatListRef.current)
            flatListRef.current.scrollToIndex({animated:false , index:pos})
    },[pos])
   
    const scrollToIndex =(index)=>{
        console.log("after it has being pressed",index)
        // console.log(flatListRef)
        flatListRef.current.scrollToIndex({animated:true , index:index})
    }
    const [fontLoading] = useFonts({
      "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
      "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
      "MoonBold":require('../assets/constants/Font/MoonBold.otf')
    })
  
    if (!fontLoading) {
      return null;
    }

      return (
        <View style={{flex:1,paddingTop:statusBarHeight-10,alignItems:'center' ,backgroundColor:color }}>
            
            <ViewHeader heading = {header}/>
            {/* <Text>{Data[1].key}</Text> */}
            {/* else you gonna render ads */}
            
            <FlatList
                ref = {flatListRef}
                data={Data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle = {20}
                pagingEnabled
                initialScrollIndex={pos}    //should start here
                keyExtractor={(items,index) =>(index)}
                scrollEnabled={false}
                renderItem={(item , I)=>(
                    // item.item.title
                    
                  <View style={{ alignItems:'center' , width:width  }}>
                    {/* model for the concepts screen */}
                   
                    <View style={{width:'80%' , height:50 , justifyContent:'center' }}>
                        <Text 
                        numberOfLines={2}
                        adjustsFontSizeToFit={true}
                        style={{textAlign:'center',fontSize:15 ,fontFamily:'MoonBold' }}>{item.item.Title} by {item.item.Author}</Text>
                    </View>
                    <View style={{width:'90%'}}>
                        <CardView  dark={dark} setDark={setDark} setHowTo={setHowTo} setConcept={setConcept} ideaContent={item.item.Summary} HowToContent={item.item.Lesson}/>
                    </View>
                  </View>
                )
                
                }
            />
    
            <View style={{position:'absolute' , justifyContent:'space-between',alignItems:'center' ,padding:0,height:50, width:'90%', bottom:13 ,flexDirection:'row'}}>
    
                <TouchableOpacity
                   onPress={()=>{
                    if(pos === 0 ){
                        console.log("You are in the first position you cannot scroll back")
                        return
                    }
                    setPos(pos-1)
                }}
                   >
                      <EvilIcons name="arrow-left" size={50} color="black" />
                </TouchableOpacity>
    
                <View style={{flexDirection:'row' , width:width*0.2 , alignItems:'center' ,justifyContent:'center'}}>
                    <Text>{pos+1}</Text>
                    <Text>/{Index.Size}</Text>
                </View>
    
                <TouchableOpacity
                       onPress={()=>{
                        if(pos === Data.length - 1){
                            console.log("you scrolled passed the list")
                            return
                        }
                        setInterstitialCounter(interstitialCounter+1)
                        setPos(pos+1)
                    }}
                    >
    
                    <EvilIcons name="arrow-right" size={50} color="black" />
                </TouchableOpacity>
    
            </View>
        </View>
      )

  }

export default Card


