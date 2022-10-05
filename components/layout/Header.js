import React from 'react'
import headerStyle from '../../styles/Header.module.css'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { colorArrState } from '../state'
import Image from 'next/image'


const Header = () => {
  const [dropDown, showDropDown] = useState(false);

  // const colorArr = ['linear-gradient(to right, rgb(27, 178, 183) , rgb(42, 109, 172))', 'linear-gradient(to right, rgb(40, 86, 47) , rgb(91, 184, 127))', 'linear-gradient(to right, rgb(27, 178, 183) , rgb(42, 109, 172))']
  // const [colorArray, setColorArray] = useRecoilState(colorArrState)
  // const [index, changeIndex] = useState(0);
  // const [color, changeColor] = useState(colorArr[index])



  // const clickColor = () => {
  //   if (index != 3) {
  //     changeIndex(index => index + 1)
  //   } else {
  //     changeIndex(0);
  //   }
  //   changeColor(colorArr[index])
  //   setColorArray(colorArr[index])
  // }


  return (
    <>
    <header className={headerStyle.header}>
      <div className={headerStyle.wrapper}>
        <div className={headerStyle.logoDiv}>
       {/* <Image src='/logo2.png' width={80} height={80}/> */}
              LOGO
        </div>
        <div className={headerStyle.userDropDown}>
          <button onClick={() => showDropDown(!dropDown)} className={headerStyle.userButton}>
            username
            <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/>
          </button>
          <div className={headerStyle.dropDown} style={dropDown ? {display: 'flex'} : {display: 'none'}}>
            <a>Logout</a>
            <a>Settings</a>
            <a >color</a>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header