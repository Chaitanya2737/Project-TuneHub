import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvide";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";
const SongDisplayInHome = () => {
    const [{ allSong }, dispatch] = useStateValue();
    useEffect(() => {
      if (!allSong) {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONG,
            allSong: data.data,
          });
        });
      }
    }, []);
    return (
      <div className="w-full p-4 flex items-center justify-center flex-col">
        <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
          <SongContainer data={allSong} />
        </div>
      </div>
    );
  };
  
  export const SongContainer = ({ data }) => {
    return (
      <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
        {data &&
          data.map((song, i) => (
            <SongCard key={song._id} data={song} index={i}  type={"song"} home ={true}/>
          ))}
      </div>
    );
}

export default SongDisplayInHome