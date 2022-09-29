import React from 'react'
import footerStyle from '../../styles/Footer.module.css'


const Footer = () => {
  return (
    <>
        <div className={footerStyle.footerSpacer}></div>
        <footer className={footerStyle.footer}>
            <div className={footerStyle.textWrapper}>
                <a>
                    Technologies
                </a>
                <a>
                    copyright blah
                </a>
                <a>
                    about
                </a>
                <a className={footerStyle.projectName}>
                    cool name of project
                </a>
            </div>
        </footer>
    </>
  )
}

export default Footer