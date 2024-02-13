
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login ,  Dashboard, MusicPlayer  } from './component'
import {motion} from "framer-motion"

import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import {AnimatePresence} from "framer-motion"
import { validaterUser } from './api'
import {useStateValue} from "./context/StateProvide"
import { actionType } from './context/reducer'

const App = () => {
  const firebaseAuth = getAuth(app)

  const navigate = useNavigate()
  const [auth, setauth] = useState(false || window.localStorage.getItem("auth") === "true")
  const [{user ,isSongPlaying },  dispatch]=useStateValue();
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((userCrad) => {
      if (userCrad) {
        userCrad.getIdToken().then((token) => {
          validaterUser(token).then((data)=>{
            dispatch({
              type :actionType.SET_USER,
              user:data
            })
          })
        })
      }
      else {
        setauth(false)
        window.localStorage.setItem("auth", "false")
        dispatch({
          type :actionType.SET_USER,
          user:null
        })
        navigate("/login")
      }
    })
  
    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
    };
  }, []);
  
  return (
    <AnimatePresence existBeforeEnter>
    <div className='h-auto min-w-[680px] bg-primary-400 flex justify-center items-center'>
      <Routes>
        <Route path='/login' element={<Login setauth={setauth} />} />
        <Route path='/*' element={<Home />} />
        <Route path='/dashboard/*' element={<Dashboard />}/>

      </Routes>
      {
        isSongPlaying && (
          <motion.div initial={{opacity:0 ,  y:50}} 
          animate={{opacity :1 , y:0}}
          className= {`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
          
          <MusicPlayer />  
          </motion.div>
        )
      }
    </div>
    </AnimatePresence>
  )
}

export default App