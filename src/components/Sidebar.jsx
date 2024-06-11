import React from 'react'
import { sideLinks, subs } from '../constants'




const Sidebar = ({ sidebar, category, setCategory }) => {
  return (
    <div className={`bg-white w-[15%] h-[150vh] absolute pl-[2%] pt-[20px]  ${sidebar ? "" : " w-[8%]"}  `}>
      <div className=" flex flex-col gap-5">

        {sideLinks.map((links) =>
        (
          <div className={`flex items-center w-fit cursor-pointer ${category === links.id ? "active" : ""}  `} onClick={() => setCategory(links.id)}>
            <img className='w-5 mr-5' src={links.src} />
            <p className={`max-md:hidden ${sidebar ? "" : "hidden"}`}>{links.name}</p>
          </div>
        )
        )}

        <hr className=' border-0 h-[1px] bg-[#ccc] w-[90%]' />
        <h3 className={`font-bold text-[13px] my-5 max-md:hidden ${sidebar ? "" : "hidden"} `} >Subscriptions</h3>
        {subs.map((sub) => (
          <div className='sub'>

            <div className=' flex items-center gap-3 max-sm:hidden rounded-full'>
              <img className=' w-10 h-10  object-contain rounded-full' src={sub.src} />
              <p className={`max-md:hidden ${sidebar ? "" : "hidden"}`} >{sub.name}</p>
            </div>

          </div>
        ))}




      </div>

    </div >
  )
}

export default Sidebar