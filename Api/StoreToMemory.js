import { View, Text } from 'react-native'
import React, { Children, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const MemoryContext = createContext({})

export const StoreProvider= ({children}) => {

    const [posB , setPosB] = useState(0)
    const [posC , setPosC] = useState(0)
    const [posP , setPosP] = useState(0)
    const [posPsy , setPosPsy] = useState(0)
    const [posD , setPosD] = useState(0)
    const [posL , setPosL] = useState(0)

    React.useEffect(() =>{
        async function position(){
            const getBPos = await AsyncStorage.getItem("BUSINESS") 
            if(getBPos){

            }else{
                AsyncStorage.setItem("BUSINESS" , pos.toString())
            }

            const getCPos = await AsyncStorage.getItem("COMMUNICATION")
            if(getCPos){
                
            }else{
                AsyncStorage.setItem("COMMUNICATION" , pos.toString())
            }

            const getPPos = await AsyncStorage.getItem("PRODUCTIVITY")
            if(getPPos){
                
            }else{
                AsyncStorage.setItem("PRODUCTIVITY" , pos.toString())
            }

            const getDPos = await AsyncStorage.getItem("DISCIPLINE")
            if(getDPos){
                
            }else{
                AsyncStorage.setItem("DISCIPLINE" , pos.toString())
            }

            const getLPos = await AsyncStorage.getItem("LEARNING")
            if(getLPos){
                
            }

            const getPsyPos = await AsyncStorage.getItem("PSYCHOLOGY")
            if(getPsyPos){
                
            }

        }

        position()
    },[])

  return (
    <MemoryContext.Provider
        value={{}}
    >
        {children}
    </MemoryContext.Provider>
  )
}

export default function StoreToMemory(){
    return useContext(MemoryContext)
}