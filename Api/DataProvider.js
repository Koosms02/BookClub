
import { View, Text } from 'react-native'
import React, { createContext, useContext, useMemo ,useState} from 'react'
import {doc , DocumentSnapshot, getDoc , getFirestore} from "firebase/firestore"
import { db } from './Firebase/Firebase'
import { LogBox } from 'react-native';

 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();



const DataContext = createContext({})

export const  DataProvider = ({children}) => {

  const [load , setLoad] = useState(false)
  //check is the firebase is connected 
  //check if the network connection is good
  //
 
  const [Finance , setFinance] = useState()
  const [Communication , setCommunication] = useState()
  const [Discipline , setDiscipline] = useState()
  const [Productivity , setProductivity] = useState()
  const [Education , setEducation ] =  useState()
  const [Psychology , setPsychology] = useState()

  const [F , setF]  = useState([])
  const [C , setC] = useState([])
  const [D , setD ] = useState([])
  const [P  ,setP] = useState([])
  const [E ,setE] = useState([])
  const [psy , setPsy] = useState([])

  const [isLoadedBusiness , setIsLoadedBusiness] = useState(false)
  const [isLoadedCommunication , setIsLoadedCommunication] = useState(false)
  const [isLoadedDiscipline , setIsLoadedDiscipline] = useState(false)
  const [isLoadedProductivity , setIsLoadedProductivity] = useState(false)
  const [isLoadedEducation , setIsLoadedEducation] = useState(false)
  const [isLoadedPsychology,setIsLoadedPsychology] = useState(false)
  const [error , setError] = useState(false)
  

  const docRefBusiness = doc(db ,"Business" ,"CkpdryEhbCUTv9y2vvlo")  //fetching a document for business , sales and marketing
  const docRefCommunication = doc(db ,"Comminication" ,"gsghcWYm4WoP1dy87Hws")
  const docRefDiscipline = doc(db ,"Discipline" ,"0xzq7iaSneztvVUqZLR3")
  const docRefProductivity = doc(db ,"Productivity" ,"gHTfJSJDqD6AkfGqmj0N")
  const docRefEducation = doc(db ,"Education" ,"ZUd5ACukxcFrfBxfyZFO")
  const docRefPsychology = doc(db ,"Psychology" ,"69S6c0yBm4XSF6qmqIY0")


  //function for modelling the data 
  function modelData (key , title  , author , LessonArray , summary){
    // create object that containes the key , title  , author , lesson , and summary 
   
    return {
      key:key,
      Title: title,
      Author:author,
      Lesson:LessonArray , 
      Summary:summary,
    }
  }

  function StoreInArray(object ,array ,  setArray){
    var dummyArray = []

    if(object !== null){
      var key = 0 
      const l = Object.entries(object)
      for(var i = 0 ; i < l.length ;i++){
        var Data = l[i]
        for(var j = 0 ; j < Data.length; j++){
           var t = Object.entries(Data)[j]
           //just a temporary fix
           if(j === 1){
                // console.log(t[1].Lesson)
                // console.log(t[1].Title)
                // console.log(t[1].Summary)
             var modelledData = modelData(key , t[1].Title[1], t[1].Title[0] , t[1].Lesson , t[1].Summary)
             dummyArray.push(modelledData)
             key+=1
           }
             
        }
      
      }
    }else{
      console.log("Something went wrong in the process")
    }
    setArray([...dummyArray , ...array])

    

  }


  React.useEffect(()=>{

    
     async function fetchFromFireStore(){
            const docSnapBusiness = await getDoc(docRefBusiness).then(
              val=>setFinance(val.data())).catch((error)=>setError(true))
              .finally(()=>setIsLoadedBusiness(true))

            // const docSnapCommunication = await getDoc(docRefCommunication).then(val=>setCommunication(val.data())).finally(()=>setIsLoadedCommunication(true))
            // const docSnapDiscipline = await getDoc(docRefDiscipline).then(val=>setDiscipline(val.data())).catch((error)=>setError(true)).finally(()=>setIsLoadedDiscipline(true))
            // const docSnapProductivity = await getDoc(docRefProductivity).then(val=>setProductivity(val.data())).catch((error)=>setError(true)).finally(()=>setIsLoadedProductivity(true))
            // const docSnapEducation = await getDoc(docRefEducation).then(val=>setEducation(val.data())).catch((error)=>setError(true)).finally(()=>setIsLoadedEducation(true))
            // const docSnapPsychology = await getDoc(docRefPsychology).then(val=>setPsychology(val.data())).catch((error)=>setError(true)).finally(()=>setIsLoadedPsychology(true))

            // didn't handle the error property correctly
     }

     fetchFromFireStore()
      
  },[])

  const allIsLoaded = isLoadedBusiness &&  isLoadedCommunication &&  isLoadedEducation &&  isLoadedPsychology &&  isLoadedProductivity &&  isLoadedDiscipline
  



  React.useEffect(()=>{
    function store(){
      if(isLoadedBusiness &&  isLoadedCommunication &&  isLoadedEducation &&  isLoadedPsychology &&  isLoadedProductivity &&  isLoadedDiscipline){
        StoreInArray(Finance ,F, setF)  
      }

    }
    store()

  },[allIsLoaded === true ,!error])
  

  //check if firebase is connected with no errors
  React.useEffect(()=>{

  },[])

  return (
    <DataContext.Provider
        value={{
          F , C ,D , P ,psy,E,
          isLoadedBusiness ,
          isLoadedCommunication ,
          isLoadedDiscipline,
          isLoadedEducation , 
          isLoadedProductivity , 
          isLoadedPsychology,
          error,load , setLoad
        }}
    >{children}</DataContext.Provider>
  )
}

export default function useData(){
     return useContext(DataContext)
}