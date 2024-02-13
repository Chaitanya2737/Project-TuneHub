
import React from 'react'
import { MdOutlineEmojiEmotions } from "react-icons/md";

import {motion} from 'framer-motion'
const Alert = ({ type }) => {
  
  return (
    <motion.div 
    initial={{translateX:200 , opacity :0}}
    animate ={{translateX:0 , opacity:1}}
    exit={{translateX:200 , opacity :0}}
    key={type}
    className={`fixed top-12 right-12 px-4 py-2  rounded-md backdrop-blur-md flex items-center justify-center shadow-md      ${type === "success" && "bg-green-500 shadow-xl"}
    ${type === "danger" && "bg-red-500"}
    `

    }>

      {
        type === "success" && (
          <div className='flex items-center justify-center gap-4 '>

            <MdOutlineEmojiEmotions className='text-3xl text-primary' />
            <p className="text-xl font-semibold text-primary">Data Saved </p>
          </div>
        )
      }

{
        type === "danger" && (
          <div className='flex items-center justify-center gap-4 '>

            <MdOutlineEmojiEmotions className='text-3xl text-primary' />
            <p className="text-xl font-semibold text-primary">something want  wrong... please try it later</p>
          </div>
        )
      }
    </motion.div>
  )
}

export default Alert