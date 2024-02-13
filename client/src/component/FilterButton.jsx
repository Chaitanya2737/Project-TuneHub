import React, { useState } from "react";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { set } from "mongoose";
import { useStateValue } from "../context/StateProvide";
import { actionType } from "../context/reducer";

const FilterButton = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState();
  const [Menu, setMenu] = useState();
  const [{filterTerm,artistFilter,languageFilter , albumFilter} , dispatch] = useStateValue();
  const updateFilterButton = (name) => {
    setMenu(false);
    setFilterName(name);
    if (flag === "Artist") {
        dispatch({
            type: actionType.SET_ARTIST_FILTER,
            artistFilter: name
        });
    }
    
    if (flag === "Album") {
        dispatch({
            type: actionType.SET_ALBUM_FILTER,
            albumFilter: name // Corrected key to albumFilter
        });
    }
    
    if (flag === "Language") {
        dispatch({
            type: actionType.SET_LANGUAGE_FILTER,
            languageFilter: name // Corrected key to languageFilter
        });
    }
    
    if (flag === "Category") {
        dispatch({
            type: actionType.SET_FILTER_TERM,
            filterTerm: name // Corrected key to filterTerm
        });
    }
    
  };
  return (
    <div className="border border-gray-300 rounded-md m-1 p-1 relative cursor-pointer  hover:border-gray-400 ">
      <p
        className="text-base tracking-wide text-textColor flex items-center gap-2"
        onClick={() => {
          setMenu(!Menu);
        }}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15 ? `${filterName.slice(0, 14)}` : filterName}
          </>
        )}

        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out ${
            Menu ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>

      {filterData && Menu && (
        <motion.div
        initial={{opacity:0 , y:50}}
        animate={{opacity:1 , y:0}}
        exit={{opacity:0 , y:50}}
        className="w-50 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col shadow-md absolute">
          {filterData?.map((data) => {
            return (
              <div
                key={data.name}
                className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
                onClick={() => updateFilterButton(data.name)}
              >
                {(flag === "Artist" || flag === "Album") && (
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-8 min-w-[32px] h-8 rounded-full object-cover "
                  />
                )}
                <p className="w-full">
                  {data.name.length > 15
                    ? `${data.name.slice(0, 15)}`
                    : data.name}
                </p>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButton;
