import CohortContainer from './CohortContainer'
import NavBar from './NavBar'
import style from '../../styles/test.module.css'
import { loggedIn } from '../state'
import { useRecoilState } from 'recoil'
import { useRouter } from "next/router"
import Link from 'next/link'
import { useEffect } from 'react'
import axios from "axios";


const FullPage = () => {
  const [loggedInStatus, setLoggedInStatus] = useRecoilState(loggedIn)
  const router = useRouter();

  useEffect(()=>{
  axios.post(`/api/authApi`).then((result) => {
    // console.log('FullPage.js'); 
    // console.log('FullPage.js'); 
    // console.log('User is logged in');
    // console.log('cookie(s)');
    console.log(document.cookie);
  }).catch(error => {
    console.log(error)
    if (error.response.status === 401) {
      // console.log('Fullpage.js - User Not Logged In')
      router.push("/");
    } 
  })
    
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
