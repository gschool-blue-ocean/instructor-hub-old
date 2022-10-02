import CohortContainer from './CohortContainer'
import NavBar from './NavBar'
import style from '../../styles/test.module.css'

const FullPage = () => {
  return (
    <div>
      <div className={style.a}>
        <NavBar/>
        <CohortContainer/>
      </div>
    </div>
  )
}

export default FullPage