import CohortContainer from './CohortContainer'
import NavBar from './NavBar'
import style from '../../styles/test.module.css'
import { loggedIn } from '../state'
import { useRecoilState } from 'recoil'
import { useRouter } from "next/router"
import Link from 'next/link'
import { useEffect } from 'react'

const FullPage = () => {
  const [loggedInStatus, setLoggedInStatus] = useRecoilState(loggedIn)
  const router = useRouter();

  useEffect(()=>{
    if(!loggedInStatus){
      router.push("/")
     }
    },[])
  

  return (
    <div>
      <div className={style.a}>
        <NavBar/>
        <CohortContainer/>
      </div>
    </div>
  );
};

export default FullPage;
