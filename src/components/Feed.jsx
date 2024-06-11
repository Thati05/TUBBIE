
import { Link } from "react-router-dom";
import { API_KEY } from "../data";
import { useState, useEffect } from "react";
import { value_converter } from "../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    try {
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card"
          key={item.id}
        >
          <img
            className="w-[100%]"
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <h2 className="text-[16px] font-bold my-[6px]">{item.snippet.title}</h2>
          <h3 className="text-[14px] font-bold my-[6px] text-[#555]">
            {item.snippet.channelTitle}
          </h3>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
          <p className="text-[14px]"></p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
