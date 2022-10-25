import React from 'react'

//import GoogleLogin from 'react-google-login'
import { GoogleLogin } from '@react-oauth/google';
import {useNavigate} from 'react-router-dom'
//import {FcGoogle} from 'react-icons/fc'

import jwt_decode from "jwt-decode";

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import { client } from '../client';

function Login() {

  const navigate=useNavigate()

  const responseGoogle=(response)=>{

    const token=response.credential
    localStorage.setItem('user',JSON.stringify(jwt_decode(token)))
    const {given_name,picture,sub}=jwt_decode(token)
    console.log(picture);

    const doc={
      _id:sub,
      _type:'user',
      userName:given_name,
      image:picture
    }

    client.createIfNotExists(doc)
    .then(()=>{
      navigate('/',{replace:true})
    })

  }

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
        src={shareVideo}
        type='video/mp4'
        loop={true}
        controls={false}
        autoPlay
        muted
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt="logo" />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
             onSuccess={responseGoogle}
              onError={responseGoogle}
            />;
            {/* <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_TOKEN}
            render={(renderProps)=>(
              <button
              type='button'
              className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              isSignedIn={true}
              >
              <FcGoogle className='mr-4'/> Sign In with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login