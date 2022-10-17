
import React , {useRef} from 'react'
import { View, Text, Button ,FlatList , Animated, TouchableOpacity , StyleSheet} from 'react-native'
import { useFonts } from 'expo-font/build/FontHooks'
import {statusBarHeight, width,buttonHeight, height } from '../assets/constants/parameter'
import {useNavigation} from "@react-navigation/native"
import LottieView from 'lottie-react-native'


const Splash = () => {

    const navigation = useNavigation()
    const scrollX = useRef(new Animated.Value(0)).current
    //importing fonts
    const [fontLoading] = useFonts({
        "FormaRegular": require('../assets/constants/Font/FormaRegular.ttf'),
        "MoonLight":require('../assets/constants/Font/MoonLight.otf'),
        "MoonBold":require('../assets/constants/Font/MoonBold.otf')
      })
    
      if (!fontLoading) {
        return null;
      }


  
    const Data = [
        {
            id:1,
            heading:'',
            description:'',
            Lottie:require('../assets/constants/Lottie/booklover.json')

        },

        {
            id:2,
            heading:'',
            description:'',
            Lottie:require('../assets/constants/Lottie/digitalBook.json')

        },


        {
            id:3,
            heading:'',
            description:'',
            Lottie:require('../assets/constants/Lottie/funread.json')

        },
    ]

  const Indicator = ({scollX})=>{
    return (
      <View style={{position:'absolute' , bottom:100 , flexDirection:'row'}}>
        {Data.map((_,i) =>{
          
          const inputRange =[(i -1)*width , i * width, (i+1) * width];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange:[0.8 , 1.4 , 0.8],
            extrapolate:'clamp'
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange:[0.8 , 0.9 , 0.8],
            extrapolate:'clamp'
          })

        
          return (
              <Animated.View
                key={`indicator-${i}`}
                style={{
                  height:10 ,
                  width:10 ,
                  borderRadius:5,
                  backgroundColor:'#333',
                  margin:10,
                  opacity,
                  transform:[
                    {
                      scale,
                    },
                    
                  ]
                }}
                  />
                  

                
          )
        })
        }
      </View>
    )
  }


  const Backdrop =({scrollX}) =>{

    const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_ , i ) => i*width),
      outputRange: bgs.map((bg) => bg)
    })
    return (
      <Animated.View
        style ={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor:[bgs[0]]
          }
        ]}
      />
          
      
      )
  }

  return (
    <View style={{alignItems:'center' , paddingTop:statusBarHeight , paddingRight:10 , paddingLeft:10}}>
      {/* <Backdrop scrollX={scrollX}/> */}

      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate('home')
      }}
      style={{marginTop:10,width:width*.2 , height:height*0.05 , alignItems:'center' , justifyContent:'center' , borderRadius:30 , backgroundColor:'red'}}>
        <Text>Skip</Text>
      </TouchableOpacity>
      <Animated.FlatList
        data = {Data}
        horizontal={true}
        scrollEventThrottle = {20}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll = { 
          Animated.event(
            [{nativeEvent:{contentOffset:{x: scrollX}}}],
            {useNativeDriver:false},
          )
           
        }

        contentContainerStyle={{ height:height, alignItems:'center'}}
        keyExtractor={items=>items.id}
        renderItem={({item })=>(
            <View>
                <View style={{paddingBottom:20,width:width, height:height*0.40}}>
                    <LottieView 
                        source={item.Lottie}/>
                </View>
                <View style={{width:width*0.9,height:buttonHeight,borderRadius:20,justifyContent:'center', alignItems:'center' ,}}>
                </View>
               
            </View>
         )   
        }
      />

      <Indicator scrollX={scrollX}/>
      
    </View>
  )
}

export default Splash