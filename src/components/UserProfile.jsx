import React, { useId } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams,useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
//import {GoogleLogout} from 'react-google-login'

import {userCreatedPinsQuery,userQuery,userSavedPinsQuery} from '../utils/data'
import {client} from '../client'
import MisonatyLayout from './MisonatyLayout'
import Spinner from './Spinner'
import { useState } from 'react'
import { useEffect } from 'react'
import CreatePin from './CreatePin'

const randomImage='https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyles='bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles='bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

function UserProfile({currentUser}) {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate=useNavigate()
  const {userId}=useParams()

  useEffect(()=>{
    const query=userQuery(userId)
    client.fetch(query)
    .then((data)=>{
      setUser(data[0])
    })
  
  },[userId])

  useEffect(()=>{
    if(text==='Created'){
      const CreatedPinsQuery=userCreatedPinsQuery(userId)
      client.fetch(CreatedPinsQuery)
      .then((data)=>{
        setPins(data)
      })
    }else if (text==='Saved'){
      const SavedPinsQuery=userSavedPinsQuery(userId)
      client.fetch(SavedPinsQuery)
      .then((data)=>{
        setPins(data)
      })
    }
    console.log(pins,userId,text)
  },[text,userId])

  const logout=()=>{
    googleLogout()
    localStorage.clear()
    navigate('/login')
  }
  if (!user) return <Spinner message='loading user Info'/>
  // console.log(userId,user)
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className="flx flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImage} alt="banner-pic" 
            className='w-full h-370 2xl:h-510  shadow-lg object-cover'
            />
            <img src={user?.image} alt=""
            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
             />
             <h1 className='font-bold text-3xl text-center mt-3'>
              {user?.userName}
             </h1>
             <div className='absolute top-0 z-1 right-0 p-2'>
             {userId===currentUser?._id && (
                  <button
                    type='button'
                    className='bg-white p-2 rounded-full cursor-pointer outline-non shadow-md'
                    onClick={logout}
                    >
                    <AiOutlineLogout color='red' fontSize={21}/>
                    
                    </button>
              )}
             </div>
          </div>
          <div className='text-center mb-7'>
              <button
                type='button'
                onClick={(e)=>{
                  setText(e.target.textContent)
                  setActiveBtn('created')
                }}
                className={`${activeBtn==='created' ? activeBtnStyles: notActiveBtnStyles}`}
              >
                Created
              </button>
              <button
                type='button'
                onClick={(e)=>{
                  setText(e.target.textContent)
                  setActiveBtn('saved')
                }}
                className={`${activeBtn==='saved' ? activeBtnStyles: notActiveBtnStyles}`}
              >
                Saved
              </button>
          </div>

          {pins?.length ? (
            <div className='px-2'>
              <MisonatyLayout pins={pins}/>
            </div>
          ):(
            <div className='flex flex-center items-center w-full txt-xl mt-2'>
              No pin Found ..
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile