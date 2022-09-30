import React from 'react'
import footerStyle from '../../styles/Footer.module.css'
import Link from 'next/link'


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
                        about
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