import { Link } from "react-router-dom"
import { menu, logo, search, upload, more, notification, David } from "../assets/images"


import React from 'react'

const Navbar = ({ setSidebar }) => {
  return (
    <nav className=" py-[10px] px-[20px] shadow-sm   justify-between  flex-div ">
      <div className=" gap-6 flex-div">
        <img className="  max-md:hidden w-[22px]" src={menu} onClick={() => setSidebar(prev => prev === false ? true : false)} />
        <Link to='/'><img src={logo} className=" w-[130px]" /></Link>
      </div>
      <div className="w-[500px] max-md:w-[240px] justify-between  flex-div
       border-solid border border-gray-300 py-[8px] px-[12px]  max-md:pl-2  rounded-[25px]
      ">
        <input className=" w-500px max-md:w-[100px] border-none outline-none bg-transparent" type="text"
          placeholder="Search"

        />
        <img className=" max-lg:w-5 " src={search} />
      </div>
      <div className=" gap-5 flex-div">
        <img className=" max-lg:hidden w-[25px] h-[25px]" src={upload} />
        <img className="  max-lg:hidden w-[25px] h-[25px]" src={more} />
        <img className=" max-md:hidden w-[25px] h-[25px]" src={notification} />
        <img
          width={35}
          height={35}
          src={David} />
      </div>

    </nav>
  )
}

export default Navbar