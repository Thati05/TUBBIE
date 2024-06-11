
import { like, dislike, share, jack, user_profile, save } from "../assets/images";
import moment from "moment";
import { API_KEY } from "../data";
import { useEffect, useState } from "react";
import { value_converter } from "../data";
import { useParams } from "react-router-dom";

const Playvideo = () => {

  const { videoId } = useParams()



  const [apidata, setApidata] = useState(null);
  const [channelData, setChannelData] = useState(null)
  const [commentSection, setCommentSection] = useState([])


  {/*Fetching api data for videos  */ }
  const fetchVideoData = async () => {
    const videoList_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(videoList_Url);
      const result = await response.json();
      setApidata(result.items[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  {/*Fetching api data for comments  */ }


  const fetchComments = async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}&maxResults=50`;
    try {
      const response = await fetch(comment_url);
      const result = await response.json();
      setCommentSection(result.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  {/*Fetching api data for channel info  */ }

  const fetchChannelData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
    try {
      const res = await fetch(channelData_url);
      const outcome = await res.json();
      setChannelData(outcome.items[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, [apidata]);



  return (
    <div className="basis-[69%]">
      <iframe
        className="w-[100%] h-[37vw]"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allowFullScreen
        title="YouTube Video Player"
      ></iframe>
      <h2 className="text-[30px] my-5 font-bold">
        {apidata ? apidata.snippet.title : "Title Here"}
      </h2>
      <div className=" flex-wrap  flex justify-between items-center">
        <h2 className="text-sm text-[#555]">
          {apidata ? `${value_converter(apidata.statistics.viewCount)} views • ${apidata ? moment(apidata.snippet.publishedAt).fromNow() : "2 days ago"}` : "16K • a day ago"}
        </h2>

        <div className="flex gap-5 flex-row  ">
          <span className=" flex-row flex items-center gap-2" ><img className=" w-5" src={like} />{apidata ? value_converter(apidata.statistics.likeCount) : 500}</span>
          <span className=" flex-row flex items-center gap-2" ><img className="w-5" src={dislike} />{apidata ? value_converter(apidata.statistics.dislikeCount) : 5}</span>
          <span className=" flex-row flex items-center gap-2"><img className="w-5" src={share} />Share</span>
          <span className=" flex-row flex items-center gap-2"><img className="w-5" src={save} />Save</span>
        </div>
      </div>
      <hr className=" my-5" />
      <div className="publisher">

        <div className="  flex items-center justify-between  mt-5">
          <div className=" flex items-center gap-3 ">
            <img className="w-10 rounded-full" src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="Channel Thumbnail" />
            <div className=" gap-2">

              <h2 className=" text-xl font-bold">
                {apidata ? apidata.snippet.channelTitle : " "}
              </h2>
              <p className=" text-sm text-[#555]"> {channelData ? value_converter(channelData.statistics.subscriberCount) : "50K"} Subscribers</p>
            </div></div>

          <button className=" bg-black text-white font-semibold text-[14px] py-2 px-5 rounded-3xl " >
            Subscribe
          </button>
        </div>
        <p className=" mt-5 mb-2 text-[#555] text-sm ">
          {apidata && apidata.snippet && apidata.snippet.description ? apidata.snippet.description.slice(5, 250) : "Description Here"}

        </p>

        <hr className=" my-5" />
        <h4 className="my-3 text-[14px] text-[#555]">
          {apidata ? value_converter(apidata.statistics.commentCount) : 120} Comments
        </h4>
        {/*Comment section  */}

        <>
          {commentSection.map((comment, index) => (
            <div key={index} className="items-start flex gap-5">
              <img
                className="w-10 h-10 rounded-full"
                src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt="Author Thumbnail"
              />
              <div className="flex-col">
                <span className="flex gap-5 items-center">
                  <h3 className="font-bold">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </h3>
                  <p className="text-[14px] text-[#555]">{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</p>
                </span>
                <p className="text-[#555] text-[16px]">
                  {comment.snippet.topLevelComment.snippet.textOriginal}
                </p>
                <div className="flex my-2 items-center gap-5">
                  <span className="flex gap-1 items-center text-[#555] text-[12px]">
                    <img className="w-5" src={like} alt="Like" />
                    {value_converter(comment.snippet.topLevelComment.snippet.likeCount)}
                  </span>
                  <span className="flex gap-1 items-center">
                    <img className="w-5" src={dislike} alt="Dislike" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>


    </div>
  )
}

export default Playvideo