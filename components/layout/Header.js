import React from 'react'
import headerStyle from '../../styles/Header.module.css'

const Header = () => {
  return (
    <>
    <header className={headerStyle.header}>
        <div className={headerStyle.logoDiv}>logo</div>
        <div className={headerStyle.userDiv}>username</div>
    </header>
    <div className={headerStyle.spacer}></div>
    </>
  )
}

export default Header