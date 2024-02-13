import React, { useEffect } from 'react';
import { getAllAlbums } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvide";
import SongCard from "./SongCard";

import { useNavigate } from 'react-router-dom';

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUM, allAlbums: data.data });
      });
    }
  }, []);

 

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <AllAlbums data={allAlbums} />
      </div>
    </div>
  );
};

export const AllAlbums = ({ data }) => {


  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly" >
      {data &&
        data.map((album, i) => (
          <div key={album._id} >
            <SongCard data={album} index={i} type={"album"} />
          </div>
        ))}
    </div>
  );
};

export default DashboardAlbum;
