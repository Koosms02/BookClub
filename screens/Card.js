import { View, Text, TouchableOpacity ,StatusBar,ScrollView } from 'react-native'
import React, {useState } from 'react'
import { width ,height ,UNIT_ID_REWARDED,UNIT_ID_INTERSTITIAL,Banner} from '../assets/constants/parameter'
import {  useNavigation, useRoute } from '@react-navigation/native'
import {useFonts} from 'expo-font/build/FontHooks'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
import CardView from '../components/CardView'
import { FlatList } from 'react-native'
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { Button } from 'react-native'





const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: false
  });

  const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED, {
    requestNonPersonalizedAdsOnly: false
  });
const Card = () => {

    const [dark , setDark] = useState(true)
    const route = useRoute()
    const header= route.params.Title
    const color = route.params.color
    const list = route.params.Data
    const [Data ,setData] = useState()
    const [banner , setBanner] = useState(false)
    const [bannerCounter , setBannerCounter] = useState(0)
    const navigation = useNavigation()
    const numeberOfItems = list.length


    const [interstitialCounter ,setInterstitialCounter] = useState(0)
    const [interstitialLoaded,setInterstitialLoaded ] = useState(false)
    const [rewardedCounter , setRewardedCounter] = useState(0)
    const [rewarded , setRewarded] = useState(false)

    const [Concept , setConcept] = useState(false)  
    const [howTo , setHowTo] = useState(false)     
    const [pos , setPos] = useState(0)
    const flatListRef = React.useRef()

    // function for creating a model to 

    function modelData(card , index){
        // console.log("index:",index,card[1])
        return {
            id:index,
            summary:card[1]
        }
    }
    React.useEffect(()=>{
        const l = Object.entries(list)
        var p =[]

        for (var i = 0 ; i < l.length ; i++){
           p.push(modelData(l[i] , parseInt(list[i][0].substring(7,8))))
        }
        setData(p.sort(function( a,b){
            return parseInt(a.id) - parseInt(b.id)
        }))

    },[])

    
    //loading a intestitial ads
    React.useEffect(()=>{
        function b(){
            if(bannerCounter > 3 && bannerCounter <10){
                setBanner(true)
            }else if(bannerCounter === 10){
            
                setBanner(false)
                setBannerCounter(0)
            }
        }
        b()
    },[bannerCounter])
    const loadInterstitial =()=>{
        const unsubscribeLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
            
              setInterstitialLoaded(true)
            }
          );

          const unsubscribeClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                
              setInterstitialLoaded(false)
              interstitial.load();
            }
          );

          interstitial.load()

          return ()=>{
            unsubscribeLoaded()
            unsubscribeClosed()
          }

    }

    //load rewarded

    const loadRewarded = () => {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
          RewardedAdEventType.LOADED,
          () => {
            setRewarded(true);
          }
        );
    
        const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          ()=>{
            console.log("reward granted")
          }
        );
    
        const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            setRewarded(false);
            rewardedInterstitial.load();
          }
        );
    
        rewardedInterstitial.load();
    
        return () => {
          unsubscribeLoaded();
          unsubscribeClosed();
          unsubscribeEarned();
        }
      };

    React.useEffect(()=>{
        if(interstitialCounter === 5){
            loadInterstitial()
            setInterstitialCounter(0)
            if(interstitialLoaded === true){
                console.log("Show the interstitial")
                interstitial.show()
            }
        }
       
    },[pos])

    React.useEffect(()=>{
        if(rewardedCounter === 10){
            loadRewarded()
            setRewardedCounter(0)
            setInterstitialCounter(0)
            
            if(rewarded === true){
                rewardedInterstitial.show()
            }
        }
    },[pos])

    React.useEffect(()=>{
        if(flatListRef.current)
            flatListRef.current.scrollToIndex({animated:false , index:pos})
    },[pos])

    // storing the data in async storage
   
    // const scrollToIndex =(index)=>{
    //     console.log("after it has being pressed",index)
    //     flatListRef.current.scrollToIndex({animated:true , index:index})
    // }
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
                        {/* header */}
                        <View style={{width:'90%' ,backgroundColor:'white' , height:50,borderRadius:20 , flexDirection:'row' ,alignItems:'center',paddingLeft:15,paddingRight:10, justifyContent:'flex-start'}}>
                        <TouchableOpacity 
                            onPress={()=>{
                                
                                navigation.navigate('books',{
                                color:route.params.color,
                                header:route.params.header,
                                currentRoute:route.params.currentRoute,
                            })}}

                            style={{width:'10%' , height:'100%' , alignItems:'center' , justifyContent:'center'}}>
                            <MaterialIcons name="arrow-back-ios" size={25} color='#2196F3'/>
                        </TouchableOpacity>
                        <View style={{width:'90%' , height:'100%' , justifyContent:'center' , alignItems:'flex-start' }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                                <View style={{alignItems:'center' , justifyContent:'center'}}>
                                    <Text 
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={1}
                                    style={{fontFamily:'MoonBold' , color:'#2196F3' }}>   
                                    {header}
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                        </View>
                        
                        {/* list to render */}
                        <FlatList
                            ref = {flatListRef}
                            data={Data}
                            horizontal={true}
                            contentContainerStyle={banner === true ?({height:height*0.72 , borderRadius:20}):({borderRadius:20})}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle = {20}
                            pagingEnabled
                            initialScrollIndex={pos}    //should start here
                            initialNumToRender={3}
                            keyExtractor={(item)=> item.id}
                            scrollEnabled={false}
                            renderItem={({item})=>{
                                if(item[0] === "affiiliate"){
                                    <Text>Buy these book </Text>
                                }else{
                                   return ( <View style={{ alignItems:'center' , width:width  }}>
                                            <View style={{width:'90%'}}>
                                                <CardView  dark={dark} setDark={setDark}  ideaContent={item.summary[1]}/> 
                                            </View>
                                        </View>)
                                        }
                                    }
                                } 

                        />
                
                        <View style={banner === true ?({position:'absolute' , justifyContent:'space-between',alignItems:'center' ,padding:0,height:50, width:'90%', bottom:63 ,flexDirection:'row'}):({position:'absolute' , justifyContent:'space-between',alignItems:'center' ,padding:0,height:50, width:'90%', bottom:13 ,flexDirection:'row'})}>
                
                            <TouchableOpacity
                                onPress={()=>{
                                if(pos === 0 ){
                                    return
                                }
                                setPos(pos-1)
                            }}
                                >
                                    <EvilIcons name="arrow-left" size={50} color="black" />
                            </TouchableOpacity>
                
                            <View style={{flexDirection:'row' , width:width*0.2 , alignItems:'center' ,justifyContent:'center'}}>
                                <Text>{pos+1}</Text>
                                <Text>/{numeberOfItems}</Text>
                            </View>
                
                            <TouchableOpacity
                                    onPress={()=>{
                                    
                                    if(pos === list.length - 1){
                                        return
                                    }
                                    setInterstitialCounter(interstitialCounter+1)
                                    // setRewardedCounter(rewardedCounter+1)
                                    setPos(pos+1)
                                    setBannerCounter(bannerCounter+1)
                                }}
                                >
                
                                <EvilIcons name="arrow-right" size={50} color="black" />
                            </TouchableOpacity>
                
                        </View>
                        {
                            banner === true && 
                            <BannerAd 
                                unitId={TestIds.BANNER}
                                size={BannerAdSize.BANNER}
                                requestOptions={{
                                    requestNonPersonalizedAdsOnly: false
                                }}
                        />
                        }
             </View>
         
        )

    }

  

export default Card


