import React from "react";
import { Logo } from "../assets/img";
import { NavLink } from "react-router-dom";
import { isActiveStyle, isNotActiveStyle } from "../utils/style";

import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvide";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import {useNavigate}from "react-router-dom"

import {motion} from "framer-motion"
import {useState} from "react"
const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setMenu] = useState(false)
  const navigate= useNavigate();
     const logOut =()=>{
        const firebaseAuth=  getAuth(app);
        firebaseAuth.signOut().then(()=>{
            window.localStorage.setItem("auth", "false")
        }).catch((error)=>{
            console.log(error)
        })
        navigate("/login" , {replace :true})
     }
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center ml-7  ">
        <li className="mx-5  test-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Home
          </NavLink>
        </li>

        <li className="mx-5  test-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Musics
          </NavLink>
        </li>

        <li className="mx-5  test-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Premium
          </NavLink>
        </li>

        <li className="mx-5  test-lg">
          <NavLink
            to={"/contactus"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div
      onMouseEnter={()=>{
        setMenu(true)
      }}
      onMouseLeave={()=> setMenu(false) }
      className="flex items-center ml-auto cursor-pointer gap-2 relative">
        <img
          src={user?.user.imageUrl}
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg "
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>

          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member .
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
        {isMenu && (

        <motion.div 
        initial={{opacity:0 ,y:50}}
        animate={{opacity: 1, y:0}}
        exit={{opacity:0 , y:50}}
        className="absolute flex flex-col z-10 top-12 p-4 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm">
          <NavLink to={"/userProfile"}>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              Profile
            </p>
          </NavLink>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                My Favorites
            </p>
            {
                user?.user?.role==="admin" && (
                    
                    <NavLink to={"/dashboard/home"}>
                <hr />
        
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Dashboard
            </p>
          </NavLink>
                )
            }
          <hr />

            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={logOut}>
                Sign Out
            </p>
        </motion.div>
        ) }
      </div>
    </header>
  );
};

export default Header;
