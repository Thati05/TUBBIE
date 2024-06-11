
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import Video from './sections/Video'
import { useState } from 'react'



const App = () => {

  const [sidebar, setSidebar] = useState(true);


  return (

    <main>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>

    </main>
  )
}

export default App