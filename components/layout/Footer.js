import React from 'react'
import footerStyle from '../../styles/Footer.module.css'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { colorArrState } from '../state'


const Footer = () => {
    const [colorArray, setColorArray] = useRecoilState(colorArrState)
  return (
    <>
        <div className={footerStyle.footerSpacer}></div>
        <footer className={footerStyle.footer} style={{backgroundImage: colorArray}}>
            <div className={footerStyle.textWrapper}>
                <div className={footerStyle.techAbout}>
                    <Link href="/technologies">
                        Technologies
                    </Link>
                    <Link href="/about">
                       ABOUT
                    </Link>
                </div>
                <a className={footerStyle.copyright}>
                    © 2022 this.props.locoHouse.teamName
                </a>
            </div>
        </footer>
    </>
  )
}

export default Footer