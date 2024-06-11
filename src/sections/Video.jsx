

import React from 'react'
import Playvideo from '../components/Playvideo'
import Recommended from '../components/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {

  const { videoId, categoryId } = useParams();



  return (
    <div className=' bg-[#f9f9f9] px-[2%] py-[20px] flex justify-between flex-wrap max-sm:justify-center'>
      <Playvideo videoId={videoId} />
      <Recommended categoryId={categoryId} />


    </div>
  )
}

export default Video