import React, { useState,useEffect } from 'react'

import MisonatyLayout from './MisonatyLayout'
import { client } from '../client'
import {feedQuery,searchQuery} from '../utils/data'
import Spinner from './Spinner'

function Search({searchTerm,setSearchTerm}) {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)

 useEffect(()=>{
    if(searchTerm){
      setLoading(true)
      const query=searchQuery(searchTerm.toLowerCase())
      client.fetch(query)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })

    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }
 },[searchTerm])
  return (
    <div>
      {loading && <Spinner message='seaching for pin'/>}
      {pins?.length !==0 && <MisonatyLayout pins={pins}/>}
      {pins?.length===0 && searchTerm!=='' && !loading && 
        <div className='mt-10 text-center text-xl'>
          No pins found !
        </div>
      }
    </div>
  )
}

export default Search