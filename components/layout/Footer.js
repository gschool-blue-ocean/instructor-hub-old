import React from 'react'
import footerStyle from '../../styles/Footer.module.css'
import Link from 'next/link'
import { useRecoilState } from 'recoil'


const Footer = () => {
  return (
    <>
        <div className={footerStyle.footerSpacer}></div>
        <footer className={footerStyle.footer}>
            <div className={footerStyle.textWrapper}>
                <div className={footerStyle.techAbout}>
                    <Link href="/technologies">
                        Technologies
                    </Link>
                    <Link href="/about">
                        ABOUT
                    </Link>
                </div>
                <div className={footerStyle.copyright}>
                    © 2022 this.props.locoHouse.teamName
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer