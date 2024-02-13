import React from 'react'
import Header  from './Header'
import { NavLink , Routes , Route } from 'react-router-dom'
import {IoHome} from "react-icons/io5"
import { isActiveStyle, isNotActiveStyle } from '../utils/style'
import DashboardHome from "./DashboardHome"
import DashboardUser from "./DashboardUser"
import DashboardSong from "./DashboardSong"
import DashboardArtist from './DashboardArtist'
import DashboardAlbum from './DashboardAlbum'
import DashboardNewSong from './DashboardNewSong'
import Alert from './Alert'
import { useStateValue } from "../context/StateProvide"


const Dashboard = () => {
  const [{ alertType}, dispatch] = useStateValue();

  return (
    <div className='w-full h-auto  flex flex-col items-center justify-center bg-primary'>
        <Header/>
        <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
          <NavLink to={"/dashboard/home"} >
          <IoHome className='text-2xl text-textColor' />
          </NavLink>
          <NavLink to={"/dashboard/user"} className={({isActive})=>isActive ?isActiveStyle :isNotActiveStyle}>
          Users
          </NavLink>  
          <NavLink to={"/dashboard/songs"} className={({isActive})=>isActive ?isActiveStyle :isNotActiveStyle}  >
          Song
          </NavLink> 
           <NavLink to={"/dashboard/artist"} className={({isActive})=>isActive ?isActiveStyle :isNotActiveStyle} >
          Artist
          </NavLink>  
          <NavLink to={"/dashboard/album"} className={({isActive})=>isActive ?isActiveStyle :isNotActiveStyle} >
          Albums
          </NavLink>
        </div>
        <div className="my-4 w-full  p-4">
          <Routes>
            <Route path='/home' element={<DashboardHome />}/>
            <Route path='/user' element={<DashboardUser />}/>
            <Route path='/songs' element={<DashboardSong/>}/>
            <Route path='/artist' element={<DashboardArtist/>}/>
            <Route path='/album' element={<DashboardAlbum/>}/>
            <Route path='/newsong' element={<DashboardNewSong />}/>
        </Routes>
        </div>
        
        {
          alertType && (

            <Alert type={alertType} />
          )
        }
        
    </div>
  )
}

export default Dashboard