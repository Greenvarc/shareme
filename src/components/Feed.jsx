import React,{useState} from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'

import MisonatyLayout from './MisonatyLayout'
import Spinner from './Spinner'

function Feed() {
  const [loading,setLoading]=useState(false)
  const [pins,setPins]=useState(null)
  const {categoryId}=useParams();

  useEffect(()=>{
    setLoading(true)
    if(categoryId){
      //specific data
      const query=searchQuery(categoryId)
      client.fetch(query)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })

    }
    else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }
    console.log(categoryId,pins)
  },[categoryId])
  if (loading) return <Spinner message='We are adding new ideas  to your feed !' />

  if (!pins?.length) return <h2>No pins avalaible</h2>
  return (
    <div>
        {pins && <MisonatyLayout pins={pins}/>}
    </div>
  )
}

export default Feed