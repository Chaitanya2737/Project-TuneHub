import React, {useEffect , useState} from 'react';
import { useStateValue } from "../context/StateProvide";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { changingUserRole, getAllUser, removeUser } from "../api";
import moment from "moment"
import {} from "../context/reducer"
import {MdDelete} from "react-icons/md"

const DashboardUser = () => {
 
  const [{ allUser }, dispatch] = useStateValue();


  useEffect(() => {
    if (!allUser) {
      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USER,
          allUser: data.data,
        });
      });
    }
  
  }, []);
  return (
    <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3'>
      <div className="absolute top-4 left-4 ">
        <p className="text-sm font-semibold text-textColor">
          Total User :
          <span className='text-xl font-bold text-textColor '>{allUser?.length}</span>
        </p>
      </div>

      <div className="w-full min-w-[750px] flex items-center justify-between">
        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>{" "}
      </div>

      {
        allUser && (
          allUser.map((data, i) =>
            <DashboardUserCard key={i} data={data}></DashboardUserCard>
          )
        )
      }
    </div>
  )
}

export const DashboardUserCard = ({ data ,  index}) => {
  const [{ user , allUser}, dispatch] = useStateValue();
  const updateUserRole=(userId , role)=>{
    setisUserRoleUpdated(false)
    changingUserRole(userId ,role).then((res)=>{
      if(res){
        getAllUser().then((data)=>{
          dispatch({
            type : actionType.SET_ALL_USER,
            allUser : data.data
          })
        })
      }
    })
  }

  const createdAt =  moment(new Date(data.createdAt)).format("MMM Do YY"); 
  const [isUserRoleUpdated, setisUserRoleUpdated] = useState(false)

  const deleteUser=(userId)=>{
    removeUser(userId).then((res)=>{
      if(res){
        getAllUser().then((data)=>{
          dispatch({
            type : actionType.SET_ALL_USER,
            allUser : data.data
          })
        })
      }
    })
  }
  return (
    <motion.div key={index}
      className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'
    >
      {
         data._id!==user?.user._id &&(

      <motion.div whileTap={{scale:0.75}} className='
      absolute  left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200
      '
      onClick={()=>{
        deleteUser(data._id)
      }}
      >
        <MdDelete className='text-xl text-red-400 hover:text-red-500'/>

      </motion.div>
         )
      }
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img src={data.imageUrl} alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md' />
      </div>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.name}</p>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email}</p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email_verified?"true":"false"}</p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{createdAt}</p>
      {/* <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.role}</p> */}
      {/* Render other user data here */}
      <div className="w-275 min-w-[160px]  items-center flex items-center justify-center gap-6 relative ">
      <p className="text-base text-textColor text-center">{data.role}</p>
     {
      data._id!==user?.user._id &&(
        <motion.p whileTap={{scale:0.50}} className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md " onClick={()=>setisUserRoleUpdated(true)}>
        {data.role ==="admin"? "Member":"admin"}
      </motion.p>
      )
     }
    {
      isUserRoleUpdated  &&(
        <motion.div initial={{opacity:0, scale:0.5}}
        animate={{opacity:1 , scale:1}}
        exit={{opacity:0.3, scale:0.7}}
        
        className='absolute z-10 top-6 right-4 flex items-center text-center p-2 flex-col gap-4 bg-white  shadow-xl rounded-md'>
        <p className="text-textColor text-sm font-semibold ">
          Are You sure , do you want to mark the user as 
          <span>{data.role===" admin" ? " Member" :" admin ?"}</span>
        </p>
        <div className="flex justify-between items-center gap-4 ">
          <motion.button whileTap={{scale:0.50}} className='outline-none border- none text-sm px-4 py-1 rounded-md bg-blue-200 text-black' onClick={()=>{updateUserRole(data._id ,  data.role==="admin"?"member" : "admin")}}>
            yes
          </motion.button>

          <motion.button whileTap={{scale:0.50}} className='outline-none border- none text-sm px-4 py-1 rounded-md bg-gray-200  text-center text-black' onClick={()=>setisUserRoleUpdated(false)}>
            No
          </motion.button >
        </div>
       </motion.div>
      )
    }
      </div>
    </motion.div>
  )
}

export default DashboardUser;
