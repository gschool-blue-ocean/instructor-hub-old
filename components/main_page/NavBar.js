import React from 'react'
import styles from '../../styles/navBar.module.css'
import Link from 'next/link'

const NavBar = () => {
  return (
    <>
      <div>
        <div className={styles.navBarCon} >
          <div className={styles.worddisplay}>
            <div className={styles.navOptLeft}>
              <Link href='/home'>
                <span className={styles.navSpan}>
                  HOME
                </span>
              </Link>
            </div>
            <div className={styles.navOptMid}>
                <span className={styles.navSpan}>
                  ASANA
                </span>
            </div>
            <div className={styles.navOptMid}>
              <a href='https://auth.galvanize.com/sign_in'>
                <span className={styles.navSpan}>
                  LEARN
                </span>
              </a>
            </div>
            <div className={styles.navOptRight}>
              <a href='https://auth.pairin.com/auth/signin?continue=https://app.pairin.com'>
                <span className={styles.navSpan}>
                  PARIN
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar