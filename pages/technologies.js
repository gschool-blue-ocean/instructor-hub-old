import Image from 'next/image'
import style from '../styles/technologies.module.css'
import NavBar from '../components/main_page/NavBar'


const technologies = () => {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.header}>
          <h2>
          Technologies
          </h2>
        </div>
        <div className={style.subContainer}>
          <div className={style.technology}>
            <div className={style.imageDiv}>
              <Image src='/Nextjs-logo-bigger.png' width={240} height={144}/>
              <span className={style.techTitle}>NextJS</span>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <a className={style.link} href='https://nextjs.org/'>
                <b>Go to website</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default technologies