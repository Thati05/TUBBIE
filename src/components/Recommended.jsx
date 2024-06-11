import React, { useState, useEffect } from "react";
import moment from "moment";
import { API_KEY, value_converter } from "../data";
import { Link } from "react-router-dom";


const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const related_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(related_url);
      const result = await response.json();
      setApiData(result.items);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='basis-[30%] max-md:hidden'>
      {apiData.map((item) => (
        <Link key={item.id} to={`/video/${item.snippet.categoryId}/${item.id}`} className="gap-2 items-center flex justify-between mb-[8px]">
          <img className="basis-[49%] w-[50%] h-[50%]" src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <div>
            <h3 className="font-bold text-[14px]">{item.snippet.title}</h3>
            <p className="text-[14px]">{item.snippet.channelTitle}</p>
            <p className="text-[12px] text-[#555]">{value_converter(item.statistics.viewCount)} views </p>
            <p className="text-[12px] text-[#555]">{moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
