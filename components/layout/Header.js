import React from 'react'
import headerStyle from '../../styles/Header.module.css'
import { useState } from 'react'

const Header = () => {
  const [dropDown, showDropDown] = useState(false);

  const colorArray = ['green', 'black', 'orange', 'grey']
  const [index, changeIndex] = useState(0);
  const [color, changeColor] = useState(colorArray[index])

  const clickColor = () => {
    if (index != 3) {
      changeIndex(index => index + 1)
    } else {
      changeIndex(0);
    }
    changeColor(colorArray[index])
  }

  return (
    <>
    <header className={headerStyle.header} style={{backgroundColor: color}}>
      <div className={headerStyle.wrapper}>
        <div className={headerStyle.logoDiv}>logo</div>
        <div className={headerStyle.userDropDown}>
          <button onClick={() => showDropDown(!dropDown)} className={headerStyle.userButton}>
            username
            <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/>
          </button>
          <div className={headerStyle.dropDown} style={dropDown ? {display: 'flex'} : {display: 'none'}}>
            <a>Logout</a>
            <a>Settings</a>
            <a onClick={clickColor}>color</a>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header