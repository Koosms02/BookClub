
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
            heading:'Welcome to ',
            appTitle:'BOOKCLUB',
            description:' “A reader lives a thousand lives before he dies. The man who never reads lives only one.” ~ George R.R. Martin.',
            Lottie:require('../assets/constants/Lottie/couch.json')

        },

        {
            id:2,
            heading:'LEARN',
            description:'BOOKCLUB offer summaries and concepts of famous books .Learn from the great minds of the world by reading more',
            Lottie:require('../assets/constants/Lottie/booklover.json')

        },


        {
            id:3,
            heading:'APPLY THE LESSON',
            description:'If you can read one concepts from a book and apply that lesson, you are better than a person reading ten books without applying any of the lesson. So Bookclub offer more practical way of applying the lesson in your life',
            Lottie:require('../assets/constants/Lottie/bookshelf.json')

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
    <View style={{alignItems:'center' , paddingTop:statusBarHeight , width:width }}>
      {/* <Backdrop scrollX={scrollX}/> */}
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

        contentContainerStyle={{ height:height,justifyContent:'space-evenly'}}
        keyExtractor={items=>items.id}
        renderItem={({item })=>(
            <View style={{justifyContent:'space-evenly' , height:height*0.7 ,alignItems:'center'}}>
                {/*  These is the header */}

                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:50 }}>
                  <Text style={{fontFamily:'MoonBold' , fontSize:20}}>{item.heading}</Text>
                  <Text style={{fontFamily:'MoonBold' , fontSize:20}}>{item.appTitle}</Text>
                </View>
                <View style={{paddingBottom:20,width:width, height:height*0.40}}>
                    <LottieView 
                        source={item.Lottie}/>
                </View>
                <View style={{width:width*0.8 ,borderRadius:20,justifyContent:'center', alignItems:'center' ,}}>
                  <Text style={{textAlign:'center' ,color:'#40C4FF', fontFamily:'MoonLight' , fontSize:10}}>{item.description}</Text>
                </View>
               
            </View>
         )   
        }
      />

      <Indicator scrollX={scrollX}/>
      <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('home')
          }}
          style={{position:'absolute' ,bottom:30 , marginTop:10,width:width*.4 , height:50 , alignItems:'center' , justifyContent:'center' , borderRadius:30 , backgroundColor:'#EF5350'}}>
            <Text>Continue</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default Splash