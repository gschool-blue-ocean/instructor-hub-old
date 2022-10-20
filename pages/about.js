import style from '../styles/About.module.css'
import Image from 'next/image'
import NavBar from '../components/main_page/NavBar'
const about = () => {
  return (
     <>
    <NavBar/>
    <div className={style.container}>
      <div className={style.header}>
        <h2>
          Meet The Team 
        </h2>
      </div>
      <div className={style.subContainer}>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>
            {/* <img className={style.img} alt='team member' src='/pic1.jpg'/> */}

            <div className={style.name}>Alexander Cobble</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>
            <div className={style.name}>Zachary Hudson</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/Self-Zachtualization'>
                <Image src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='#'>
                <Image src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/Gerard.jpg' height={200} width={200}/>

            <div className={style.name}>Gerard San Juan</div>
            <div className={style.about} >
            Hi, I'm Gerard. Food is good, anime is wonderful, and software engineering is the way. 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/Tiwala'>
                <Image src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/gerard-san-juan-ab8554162/'>
                <Image src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>

            <div className={style.name}>Michael Jefferson</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>

            <div className={style.name}>Daryle Tan</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>

            <div className={style.name}>Charles Vitanza</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>
            <div className={style.name}>Mike Cohen</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>

            <div className={style.name}>Samuel Chavez</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>
            <div className={style.name}>Martha Martin</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/pic1.jpg' height={200} width={200}/>
            <div className={style.name}>Randy Fernandez</div>
            <div className={style.about} >
              This is about me blah blah blah and more blah here, creative blahs only allowed or no, 
              this is alot more difficult then I thought 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='#'><i>GH Icon</i></a>
              <a className={style.links} href='#'><i>LI Icon</i></a>
            </div>
          </div>
      </div>
    </div>
  </>
  )
}

export default about