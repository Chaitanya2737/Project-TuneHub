import React , {useEffect} from 'react'
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvide";
import SongCard from "./SongCard";
import { getAllArtist } from "../api";
const DashboardArtist = () => {

  const [{ allArtist }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ALL_ARTIST, allArtist: data.data });
      });
    }
  }, []);
  return (
    <div  className="w-full p-4 flex items-center justify-center flex-col">
       <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <ArtistContainer data={allArtist} />
      </div>
    </div>
  )
}

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.length > 0 ? (
        data.map((artist, i) => (
          <SongCard key={artist._id} data={artist} index={i} type={"artist"} />
        ))
      ) : (
        <p>No artists found</p>
      )}
    </div>
  );
};


export default DashboardArtist