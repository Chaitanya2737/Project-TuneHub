import React, { useEffect } from 'react';
import { useStateValue } from "../context/StateProvide";
import { getAllUser , getAllAlbums, getAllArtist, getAllSongs } from "../api";
import { bgColors } from "../utils/style";

import { actionType } from "../context/reducer";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() *bgColors.length)]
  return (
    <div className="p-4 w-40 gap-3 h-auto rounded-lg bg-blue-400">
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor font-semibold">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUser, allSong, allArtist, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUser) {
      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USER,
          allUser: data.data,
        });
      });
    }
    if (!allSong) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONG,
          allSong: data.data,
        });
      });
    }

    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ALL_ARTIST, allArtist: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUM, allAlbums: data.data });
      });
    }
  }, []);

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      
      <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={allUser?.length > 0 ? allUser?.length : 0} />

{/* prettier-ignore */}
<DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={allSong?.length > 0 ? allSong?.length : 0} />

{/* prettier-ignore */}
<DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={allArtist?.length > 0 ? allArtist?.length : 0} />

{/* prettier-ignore */}
<DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    
    </div>
  );
};

export default DashboardHome;
