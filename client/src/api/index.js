import axios from "axios";

const baseUrl = "http://localhost:4000";

export const validaterUser = async (token) => {
    try {
        const res = await axios.get(`${baseUrl}/api/users/login`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error validating user:", error);
    }
};


export const getAllUser= async ()=>{
try {
  const res=  await axios.get(`${baseUrl}/api/users/getusers`);
  return res.data
} catch (error) {
    return null
}
}


export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/songs/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  
  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/albums/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/artists/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };


  export const changingUserRole = async (userId, role) => {
    try {
      const res = await axios.put(`${baseUrl}/api/users/update/${userId}`, { role });
      return res.data; // Return the response data
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error; // Rethrow the error to propagate it
    }
  };



  export const removeUser = async (userId) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/users/deleteUser/${userId}`);
      return res;
    } catch (error) {
      console.error('Error removing user:', error.response.data);
      return null;
    }
  };
  
export const saveNewSong = async (data ) => {
  try {
    const res = axios.post(`${baseUrl}/api/songs/save`, {...data})
    return (await res).data.song
  } catch (error) {
    
  }
}


export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseUrl}/api/artists/save`, {...data})
    return (await res).data.savedArtist
  } catch (error) {
    
  }
}


export const saveNewAlbum = async (data) =>{
  try {
    const res = axios.post(`http://localhost:4000/api/albums/save`, {...data})
    return (await res).data.savedAlbum
  } catch (error) {
    
  }
}


export const deleteSong = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/songs/delete/${id}`);
    return res.data; // Return the data from the response
  } catch (error) {
    throw error; // Throw the error so it can be caught by the caller
  }
};

export const deleteAlbum = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/albums/delete/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArtist = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/artists/delete/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};