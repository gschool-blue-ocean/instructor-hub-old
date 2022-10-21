import React from 'react'
import styles from '../../styles/navBar.module.css'
import Link from 'next/link'

const NavBar = () => {
  return (
    <>
      <div>
        <div className={styles.navBarCon}>
          <div className={styles.worddisplay}>
            <Link href="/home">
              <div className={styles.navOptLeft}>
                <span className={styles.navSpan}>HOME</span>
              </div>
            </Link>
            <div className={styles.navOptMid}>
              <span className={styles.navSpan}>ASANA</span>
            </div>
            <a className={styles.navOptMid} href="https://auth.galvanize.com/sign_in" >
              <span className={styles.navSpan}>LEARN</span>
            </a>
            <a className={styles.navOptRight} href="https://auth.pairin.com/auth/signin?continue=https://app.pairin.com" >
              <span className={styles.navSpan}>PAIRIN</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar