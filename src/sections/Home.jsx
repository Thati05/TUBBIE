import Feed from "../components/Feed"
import Sidebar from "../components/Sidebar"
import { useState } from "react"


const Home = ({ sidebar }) => {

  const [category, setCategory] = useState(0)

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={` ${sidebar ? "bg-[#fff] pl-[20%] pr-[2%] py-5 " : "pl-[9%]"}`}>
        <Feed category={category} />
      </div>

    </>
  )
}

export default Home