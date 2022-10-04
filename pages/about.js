import style from '../styles/About.module.css'
import Image from 'next/image'

const about = () => {
  return (
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
 colorA
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

            <div className={style.name}>Alexander </div>
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

            <div className={style.name}>Randy</div>
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
            <div className={style.name}>Sam</div>
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

            <div className={style.name}>Zach</div>
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
            <div className={style.name}>Gerard</div>
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
            <div className={style.name}>Martha</div>
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
  )
}

export default about