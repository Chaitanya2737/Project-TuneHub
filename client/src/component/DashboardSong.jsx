import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvide";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";
const DashboardSong = () => {
  const [{ allSong }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSong) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONG,
          allSong: data.data,
        });
      }).catch(error => {
        // Handle error if needed
        console.error("Error fetching songs:", error);
      });
    }
  }, []);
  
  const [songFilter, setsongFilter] = useState("");
  const [isFocus, setisFocus] = useState(false);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashboard/newsong"}
          className="flex items-center justify-center px-4 py-3  border rounded-md border-gray-300 hover:border-gray-500  hover:cursor-pointer hover:shadow"
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-200  " : "border-gray-500"
          } rounded-md bg-transparent duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          placeholder="Search Here..."
          value={songFilter}
          onChange={(e) => setsongFilter(e.target.value)}
          onBlur={() => {
            setisFocus(false);
          }}
          onFocus={() => {
            setisFocus(true);
          }}
        />

        <i className=" text-textColor text-3xl cursor-pointer">
          <AiOutlineClear />
        </i>
      </div>
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor ">
              Total Song
            </span>
            {" " + (allSong && allSong.data ? allSong.data?.length : allSong?.length)}
          </p>
        </div>

        <SongContainer data={allSong} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  const songCards = [];
  if (data && Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const song = data[i];
      if (song) { // Ensure song is defined
        songCards.push(
          <SongCard key={song._id} data={song} index={i} type={"song"} home={false} />
          
        );
        
      }
    }
  }
  
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {songCards}
    </div>
  );
};


export default DashboardSong;
