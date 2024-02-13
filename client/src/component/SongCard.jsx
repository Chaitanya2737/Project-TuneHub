import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { IoTrash } from 'react-icons/io5';
import { useStateValue } from '../context/StateProvide';
import {deleteAlbum, deleteArtist, deleteSong, getAllAlbums, getAllArtist, getAllSongs} from "../api"
import { actionType } from '../context/reducer';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../config/firebase.config';

const SongCard = ({ data, index , type , home  }) => {
  const [isDelete, setisDelete] = useState(false)
  const [{ alertType , allArtist, allAlbums, filterTerm, artistFilter, languageFilter, albumFilter, allSong ,
    isSongPlaying,
    songIndex}, dispatch] = useStateValue();
  const deleteData =(data) => {
    if (type==="song") {
      deleteSong(data._id).then((res)=>{
        if (res.data) {

          const deleteRef = ref(storage, data.imageUrl);

          deleteObject(deleteRef)
          .then(() => {

          })
          dispatch({
            type: actionType.SET_ALERT_TYPE ,
            alertType : "success"
          })
          setInterval (()=>{
            dispatch({
              type: actionType.SET_ALERT_TYPE ,
              alertType : null
            })
          },3000)
        }
        getAllSongs().then(song => {
          dispatch({
            type: actionType.SET_ALL_SONG,
            allSong: song,
          })
        })
      })
    }

    if (type==="artist") {
      deleteArtist(data._id).then((res)=>{
        if (res.data) {
          const deleteRef = ref(storage, data.imageUrl);

          deleteObject(deleteRef)
          .then(() => {

          })
          dispatch({
            type: actionType.SET_ALERT_TYPE ,
            alertType : "success"
          })
          setInterval (()=>{
            dispatch({
              type: actionType.SET_ALERT_TYPE ,
              alertType : null
            })
          },3000)
       
        }
        getAllArtist().then((data) => {
          dispatch({ type: actionType.SET_ALL_ARTIST, allArtist: data.data });
        });
      
      })
    }


    if (type==="album") {
      deleteAlbum(data._id).then((res)=>{
        if (res.data) {

          const deleteRef = ref(storage, data.imageUrl);

          deleteObject(deleteRef)
          .then(() => {

          })
          dispatch({
            type: actionType.SET_ALERT_TYPE ,
            alertType : "success"
          })
          setInterval (()=>{
            dispatch({
              type: actionType.SET_ALERT_TYPE ,
              alertType : null
            })
          },3000)
        }     
        getAllAlbums().then((data) => {
          dispatch({ type: actionType.SET_ALL_ALBUM, allAlbums: data.data });
        });
      })
    }
  }
  const  addTOContext = () => {
    if (!isSongPlaying) {
      dispatch({type :actionType.SET_ISSONG_PLAY ,
        isSongPlaying :true
      })
    }


    if (songIndex !== index) {
      dispatch({type :actionType.SET_SONG_INDEX ,
        songIndex :index
      })
    }

  }
  return (
    <motion.div className='relative w-40 min-w-210 p-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center' onClick={type === "song" ? addTOContext : null}>
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileTap={{ scale: 1.05 }}
          src={data.imageUrl}
          className='w-full rounded-lg object-cover'
        />
      </div>
      <p className='text-base text-center  text-headingColor font-semibold my-2'>
        {
          data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name
        }
        {
          data.artist && (<span className='block text-sm text-gray-400 my-1'>
            {
              data.artist.length > 25 ? `${data.artist.slice(0, 25)}...` : data.artist
            }
          </span>)
        }

      </p>
      {
        !home && (

      <div className="w-full absolute bottom-2 left-0 flex items-center justify-between px-4">
        <motion.i whileTap={{ scale: 0.75 }} className='text-base text-red-400 drop-shadow-md hover:text-red-600' onClick={()=>setisDelete(true)}>
          
          <IoTrash />
        </motion.i>
      </div>
        )
      }
{
  isDelete && (
    <motion.div className='absolute  inset-0  backdrop-blur-lg bg-cardOverlay flex items-center flex-col  justify-center'
    initial={{opacity:0}}
    animate={{opacity:1}}
    >
      <p className='text-lg text-headingColor font-semibold text-center'>
        Are you sure to delete it?
      </p>
      <div className='flex items-center gap-4 '>
        <motion.button className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer" whileTap={{ scale: 0.7 }}
        onClick={()=>deleteData(data)}
        >
          Yes
        </motion.button>
       <motion.button className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer " whileTap={{ scale: 0.7 }} onClick={()=>setisDelete(false)}>
          NO
        </motion.button>

      </div>
    </motion.div>
  )
}
    </motion.div>
  );
};

export default SongCard;
