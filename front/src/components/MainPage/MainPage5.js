import React from 'react'
import NavBar from '../NavBar'
import '../../styles/mainpage/mainpage5.css'
import SeaLevel from '../Charts/SeaLevelGraph'
import Disasters from '../Charts/Disasters'
const MainPage5 = () => {
  return (
    <div className='mainpage5'>
      <NavBar/>
      <div className='graphContainer'>
        <div className='graphDescription'>
        <a>안녕</a>
        </div>
        <Disasters/>
      </div>
    </div>
  )
}

export default MainPage5
