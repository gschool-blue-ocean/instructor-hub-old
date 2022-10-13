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
              <div className={style.image}>
                <Image src='/Nextjs-logo-bigger.png' width={240} height={144}/>
              </div>
              <div className={style.techTitle}>NextJS</div>
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
          <div className={style.technology}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src='/React-icon.svg.png' width={240} height={209}/>
              </div>
              <div className={style.techTitle}>React</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              Okasan okasan Baka Tsundere Senpai Tomodachi fuzakeru, nii san damasu Kawaii damaru chikara Senpai. Daijobu Daijobu damaru Oppai itadakimasu Oniisan Oniisan Kawaii, arigatou chikara damasu nii san chikara. Daijobu doki doki chotto Imoto Senpai, damaru itadakimasu doki doki Oniisan chikara Tsundere Senpai. Kimochi Tsundere arigatou okasan kimochi fuzakeru Oppai okasan Kawaii. Kimochi Tsundere Daijobu nii san doko damaru, doki doki damasu Daijobu Daijobu.
              </span>
              <a className={style.link} href='https://reactjs.org/'>
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src='/Axios-logo.png' width={300} height={44}/>
              </div>
              <div className={style.techTitle}>Axios</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              Okasan okasan Baka Tsundere Senpai Tomodachi fuzakeru, nii san damasu Kawaii damaru chikara Senpai. Daijobu Daijobu damaru Oppai itadakimasu Oniisan Oniisan Kawaii, arigatou chikara damasu nii san chikara. Daijobu doki doki chotto Imoto Senpai, damaru itadakimasu doki doki Oniisan chikara Tsundere Senpai. Kimochi Tsundere arigatou okasan kimochi fuzakeru Oppai okasan Kawaii. Kimochi Tsundere Daijobu nii san doko damaru, doki doki damasu Daijobu Daijobu.
              </span>
              <a className={style.link} href='https://axios-http.com/'>
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src='/Recoiljs-logo.png' width={300} height={106}/>
              </div>
              <div className={style.techTitle}>Recoiljs</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              Okasan okasan Baka Tsundere Senpai Tomodachi fuzakeru, nii san damasu Kawaii damaru chikara Senpai. Daijobu Daijobu damaru Oppai itadakimasu Oniisan Oniisan Kawaii, arigatou chikara damasu nii san chikara. Daijobu doki doki chotto Imoto Senpai, damaru itadakimasu doki doki Oniisan chikara Tsundere Senpai. Kimochi Tsundere arigatou okasan kimochi fuzakeru Oppai okasan Kawaii. Kimochi Tsundere Daijobu nii san doko damaru, doki doki damasu Daijobu Daijobu.
              </span>
              <a className={style.link} href='https://recoiljs.org/'>
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src='/Postgresql_elephant.svg.png' width={280} height={289}/>
              </div>
              <div className={style.techTitle}>PostgreSQL</div>
            </div>
            <div className={style.about}>
              <div className={style.text}>
              Okasan okasan Baka Tsundere Senpai Tomodachi fuzakeru, nii san damasu Kawaii damaru chikara Senpai. Daijobu Daijobu damaru Oppai itadakimasu Oniisan Oniisan Kawaii, arigatou chikara damasu nii san chikara. Daijobu doki doki chotto Imoto Senpai, damaru itadakimasu doki doki Oniisan chikara Tsundere Senpai. Kimochi Tsundere arigatou okasan kimochi fuzakeru Oppai okasan Kawaii. Kimochi Tsundere Daijobu nii san doko damaru, doki doki damasu Daijobu Daijobu.
              </div>
              <a className={style.link} href='https://www.postgresql.org/'>
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