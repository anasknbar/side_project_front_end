'use client'
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import useSWR from "swr"

export default function conversationResources(){
  const apiEndPoint = 'http://127.0.0.1:8000/conversation/'
  const {tokens} = useContext(AuthContext)
  const {data,err,mutate} = useSWR([apiEndPoint,tokens],fetchResources)

  // config
  function config(){
    return {
      headers :{
        'Content-Type' : 'Application/json',
        'Authorization' : 'Bearer ' + tokens.access
      }
    }
  }

  async function fetchResources(){
    
  }
  async function createResource(data){
    if (!tokens){
      return
    }
    try{
      const options = config()
      const url = `${apiEndPoint}create/`
      options.method = 'POST'
      options.body = JSON.stringify(data)
      await fetch(url,options)
      mutate()

      

    }catch(err){
      console.log(err)
    }
  }

  return {
    createConversation: createResource,
    loading: tokens && !err && !data,
    error : err
  }
}