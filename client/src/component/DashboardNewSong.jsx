import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvide";

import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from '../context/reducer'
import { filterByLanguage, filters } from "../utils/supportfuntion";
import { IoMusicalNote } from "react-icons/io5";
import FilterButton from "./FilterButton";

const DashboardNewSong = () => {
  const [songName, setsongName] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [{ allArtist, allAlbums, filterTerm, artistFilter, languageFilter, albumFilter, alertType, allSong }, dispatch] = useStateValue();
  const [songImage, setsongImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);


  const [artistImageCover, setartistImageCover] = useState(null)
  const [artistUploadingProgress, setartistUploadingProgress] = useState(0);
  const [isArtistLaoding, setisArtistLaoding] = useState(false)
  const [artistName, setartistName] = useState("")
  const [twitter, settwitter] = useState("")
  const [instagram, setinstagram] = useState("")




  const [albumImageCover, setalbumImageCover] = useState(null)
  const [albumUploadingProgress, setalbumUploadingProgress] = useState(0)
  const [isAlbumUploading, setisAlbumUploading] = useState(false)
  const [albumName, setalbumName] = useState("")



  useEffect(() => {
    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTIST,
          allArtist: data.data
        })
      })
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUM,
          allAlbums: data.data
        })
      })
    }
  }, [allArtist, allAlbums]);

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAudioLoading(true);
      setisAlbumUploading(true);
      setisArtistLaoding(true);
    }

    const deleteRef = ref(storage, url);

    deleteObject(deleteRef)
      .then(() => {
        setIsImageLoading(false);
        setsongImage(null);
        setAudioImageCover(null);
        setalbumImageCover(null)
        setartistImageCover(null)
        setIsAudioLoading(false);
        setisAlbumUploading(false);
        setisArtistLaoding(false);
      

      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        setIsImageLoading(false);
      });
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
  };

  const saveSong = () => {
    if (!songImage || !audioImageCover) {
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageUrl: songImage,
        songUrl: audioImageCover,
        artist: artistFilter,
        language: languageFilter,
        album: albumFilter,
        category: filterTerm,
      }
      saveNewSong(data).then(res => {
        getAllSongs().then(song => {
          dispatch({
            type: actionType.SET_ALL_SONG,
            allSong: song,
          })
        })
      });
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
      setsongName(null)
      setIsAudioLoading(false)
      setIsAudioLoading(false)
      setsongImage(null)
      setAudioImageCover(null)
      dispatch({
        type:actionType.SET_ALBUM_FILTER  ,  albumFilter :null
      })
      dispatch({
        type:actionType.SET_ALL_ARTIST  ,  artistFilter :null
      })
      dispatch({
        type:actionType.SET_LANGUAGE_FILTER  ,  languageFilter :null
      })
      dispatch({
        type:actionType.SET_FILTER_TERM  ,  filterTerm :null
      })
    }
  };


  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
    }
    else{
      setisArtistLaoding(true);
      const data = {
        name: artistName,
        imageUrl:artistImageCover,
        twitter: twitter,
        instagram: instagram,
      }

      saveNewArtist(data).then(res => {
        getAllArtist().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTIST,
            allArtist: data.artist,
          })
        })
      });
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
      setisArtistLaoding(false)
      setartistImageCover(null)
      setartistName(null)
      settwitter("null")
      setinstagram("")
    }
  }

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
    }
  
    setisAlbumUploading(true);
  
    const data = {
      name: albumName,
      imageUrl: albumImageCover,
    };
  
    saveNewAlbum(data)
      .then(() => {
        // Once album is saved, fetch all albums again and update the state
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUM,
            allAlbums: data.album,
          });
        });
      })
      .finally(() => {
        // Set isAlbumUploading to false after the operation completes
        setisAlbumUploading(false);
      });

      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
  
    // Reset state variables
    setalbumImageCover(null);
    setalbumName("");
  };
  
  return (
    <div className='flex flex-col  items-center justify-center p-4 border border-gray-500 rounded gap'>
      <input
  type="text"
  placeholder="type your song name ..."
  className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300 bg-transparent"
  value={songName || ""}
  onChange={(e) => setsongName(e.target.value)}
/>

      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButton filterData={allArtist} flag={"Artist"} />
        <FilterButton filterData={allAlbums} flag={"Album"} />
        <FilterButton filterData={filterByLanguage} flag={"Language"} />
        <FilterButton filterData={filters} flag={"Category"} />
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-dotted border-gray-300 cursor-pointer p-4 mb-4">
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImage ? (
              <FileUploader
                updateState={setsongImage}
                setProgress={setImageUploadProgress}
                isloading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img src={songImage} className="w-full h-full object-cover" alt="" />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full cursor-pointer outline-none border-none duration-200 transition-all ease-in-out bg-gray-800"
                  onClick={() => deleteFileObject(songImage, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
                   {/* song Uploader for song */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-dotted border-gray-300 f cursor-pointer p-4 mb-4">
        {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadProgress}
                isloading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md flex items-center justify-center">
                <audio controls src={audioImageCover} className="" alt="" />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full cursor-pointer outline-none border-none duration-200 transition-all ease-in-out bg-gray-800"
                  onClick={() => deleteFileObject(audioImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {
          isAudioLoading || isImageLoading ? (<DisabledButton />) : (
            <motion.button whileTap={{ scale: 0.75 }} className="px-8 py-2 rounded-4 w-full text-white bg-red-500 hover:shadow-lg cursor-pointer" onClick={saveSong} >
              Save Song
            </motion.button>
          )
        }
      </div>

        {/* image Uploader for Artist */}
        <p className="text-xl font-semibold text-headingColor"></p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-dotted border-gray-300 f cursor-pointer p-4 mb-4">
        {isArtistLaoding && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistLaoding && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setartistImageCover}
                setProgress={setartistUploadingProgress}
                isloading={setIsAudioLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md flex items-center justify-center">
                <img controls src={artistImageCover} className="" alt="" />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full cursor-pointer outline-none border-none duration-200 transition-all ease-in-out bg-gray-800"
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* artist name  */}

      <input type="text" placeholder="type your artist name ..." className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300 bg-transparent"
        value={artistName}
        onChange={(e) => setartistName(e.target.value)}
      />

      {/* twitter */}

  <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
                <p className="text-base font-semibold  text-gray-400">www.twitter.com/</p>
                <input type="text" placeholder="your twitter id" className="w-full text-base  font-semibold text-textColor outline-none bg-transparent"
                value={twitter}
                onChange={(e)=>settwitter(e.target.value)}
                />
  </div>


  {/* instragram */}

  <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
                <p className="text-base font-semibold  text-gray-400">www.instagram.com/</p>
                <input type="text" placeholder="your instagram id" className="w-full text-base  font-semibold text-textColor outline-none bg-transparent"
                value={instagram}
                onChange={(e)=>setinstagram(e.target.value)}
                />
  </div>




  <div className="flex items-center justify-center w-60 p-4">
        {
          isArtistLaoding ? (<DisabledButton />) : (
            <motion.button whileTap={{ scale: 0.75 }} className="px-8 py-2 rounded-4 w-full text-white bg-red-500 hover:shadow-lg cursor-pointer" onClick={saveArtist} >
              Save Artist
            </motion.button>
          )
        }
      </div>



      {/* Album Information */}

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-dotted border-gray-300 f cursor-pointer p-4 mb-4">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setalbumImageCover}
                setProgress={setalbumUploadingProgress}
                isloading={setisArtistLaoding}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md flex items-center justify-center">
                <img controls src={albumImageCover} className="" alt="" />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full cursor-pointer outline-none border-none duration-200 transition-all ease-in-out bg-gray-800"
                  onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <input type="text" placeholder="Album name" className="w-full text-base  font-semibold text-textColor outline-none bg-transparent"
                value={albumName}
                onChange={(e)=>setalbumName(e.target.value)}
                />


                
  <div className="flex items-center justify-center w-60 p-4">
        {
          isArtistLaoding ? (<DisabledButton />) : (
            <motion.button whileTap={{ scale: 0.75 }} className="px-8 py-2 rounded-4 w-full text-white bg-red-500 hover:shadow-lg cursor-pointer" onClick={saveAlbum} >
              Save Album
            </motion.button>
          )
        }
      </div>
                
    </div>
  );
};

const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <p className="text-xl font-semibold text-textColor ">
        {
          Math.round(progress) > 0 && <>
            {
              `${Math.round(progress)}%`
            }
          </>
        }
      </p>
      <div className="w-20 h-20 min-w-[48px] bg-red-600 animate-ping rounded-full flex items-center justify-center  relative ">
        <div className="absolute inset-o rounded-full bg-red-600 blue-xl ">

        </div>
      </div>
    </div>
  )
};

const FileUploader = ({ updateState, setProgress, isloading, isImage }) => {
  const [{ alertType }, dispatch] = useStateValue();
  const uploadFile = (e) => {
    
    isloading(true);
    const uploadedfile = e.target.files[0];
    const storageRef = ref(storage, `${isImage ? "images" : "audio"}/${Date.now()}-${uploadedfile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, uploadedfile);
    uploadTask.on("state_changed", (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }, (error) => {
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
      isloading(false);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateState(downloadURL);
        isloading(false);
        
      });
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })
      setInterval(()=>{
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      },5000)
    });
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <div className="text-lg">Click to upload {isImage ? "an image" : "an audio"}</div>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
        onChange={(e) => uploadFile(e)}
      />
    </label>
  );
};

export default DashboardNewSong;
