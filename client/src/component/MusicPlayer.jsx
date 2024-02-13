import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvide';
import { motion } from "framer-motion"
import { RiPlayListFill } from 'react-icons/ri';
import { IoArrowRedo, IoArrowUndo, IoClose, IoMusicalNote } from "react-icons/io5";
import AudioPlayer from 'react-h5-audio-player';
import { getAllSongs } from "../api"
import { actionType } from "../context/reducer"
import "react-h5-audio-player/lib/styles.css"
const MusicPlayer = () => {
  const [{ allSong, songIndex, isSongPlaying }, dispatch] = useStateValue();

  const [isPlaylist, setisPlaylist] = useState(false)

  const nextTrack = () => {
    if (songIndex < (allSong?.length - 1)) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1
      });
    }
    else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1
      })
    }
  }
  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: allSong.length - 1 // Set to the last index
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1
      });
    }
  };
 
  const  closePlayer =() =>{
    dispatch({
      type: actionType.SET_ISSONG_PLAY,
      isPlaylist: false
    });
  }

  return (
    <div className='w-full flex  items-center  '>
      <div className="w-full items-center gap-3 p-4 flex relative">

        <img src={allSong[songIndex]?.imageUrl} alt="" className='w-50  h-20 object-cover rounded-md' />
        <div className="flex items-start flex-col ">
          <p className="text-xl text-headingColor font-semibold">
            {
              `${allSong[songIndex]?.name.length > 20 ? allSong[songIndex].name.slice(0, 20) : allSong[songIndex]?.name
              }`
            } {' '}
            <span className='text-base'>({
              allSong[songIndex]?.album
            })</span>
          </p>
          <p className=' text-textColor '>
            {
              allSong[songIndex]?.artist
            } {" "}
            <span className='text-sm text-textColor font-semibold'>
              (
              {
                allSong[songIndex]?.category
              }
              )
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.75 }}
            onClick={() => setisPlaylist(!isPlaylist)}
          >

            <RiPlayListFill className='text-textColor hover:text-headingColor cursor-pointer ' >

            </RiPlayListFill>
          </motion.i>
        </div>

        <div className="flex-1">
          <AudioPlayer src={allSong[songIndex]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}


          />
        </div>
        {
          isPlaylist && (
            <PlayListCard />
          )
        }
        <IoClose onClick={closePlayer} ></IoClose>
      </div>
    </div>
  )
}

export const PlayListCard = () => {
  const [{ allSong, songIndex, isSongPlaying }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSong) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONG,
          allSong: data.data,
        });
      });
    }
  }, [])
  const setCurrentPlaySong = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAY,
        isSongPlaying: true
      })
    }


    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index
      })
    }
  };

  return (
    <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary'>
      {allSong.length > 0 ? (
        allSong.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={index}
            className='group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent'
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {music?.name.length > 20 ? music?.name.slice(0, 20) : music?.name}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">({music?.category})</span>
              </p>
            </div>
          </motion.div>
        ))
      ) : <></>}
    </div>
  );
}



export default MusicPlayer