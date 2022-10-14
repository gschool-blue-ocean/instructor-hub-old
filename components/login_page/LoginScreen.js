import SignUp from "./SignUp.js";
import styles from "../../styles/signUp.module.css";
import Link from "next/link";
import { useState } from "react"
import { useRecoilState } from "recoil";
import { usersState, loggedIn, currentCohortState } from "../state.js";
import { useRouter } from "next/router"


const LoginScreen = () => {
  const [user, setUser] = useRecoilState(usersState);
  const [enteredUsername, setEnteredUsername] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")
  const [verifiedUser, setVerifiedUser] = useRecoilState(loggedIn)
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)
  const router = useRouter();
  
  const usernameFunc = (e) => {
    setEnteredUsername(e.target.value)
  }
  const passwordFunc = (e) => {
    setEnteredPassword(e.target.value)
  }
  const checkUser = (e) =>{
    e.preventDefault()
    for (let element of user){
      if(element.username === enteredUsername && element.password === enteredPassword){
        setVerifiedUser(true)
        setUser(element)
        sessionStorage.setItem('user asana access token', `${element.asana_access_token}`)
        sessionStorage.setItem('user name', `${element.name}`)
        sessionStorage.setItem('logged_in_Status', 'true')
        setCurrentCohort(element.default_cohort)
        console.log(element)
        router.push("/home")
      }
    }
  }
  
  return (
    <div>
      <div className={styles.signUpContainer}>
        <div className={styles.signUpLargeTextContainer}>
          <div className={styles.signUpLargeText1}>
            <div className={styles.signUpLargeText2}>
              <div className={styles.signUpLargeText3}>
                <div className={styles.signUpLargeText4}>Sign In</div>
              </div>
              <div className={styles.signUpContainer2}>
                <div className={styles.signUpFormContainer}>
                  <form className={styles.signUpForm} onSubmit={(e)=>checkUser(e)}>
                    <div className={styles.accountInputContainer}>
                      <div className={styles.signUp}>Username</div>
                      <input className={styles.usernameField} type="text" onChange={(e)=>usernameFunc(e)} required></input>
                    </div>
                    <div className={styles.accountInputContainer}>
                      <div className={styles.signUp}>Password</div>
                      <input className={styles.passwordFields} type="password" onChange={(e) => passwordFunc(e)} required></input>
                    </div>
                    <div className={styles.rememberMeContainer}>
                      {/* <input type="checkbox" className={styles.rememberMeCheckBox}></input>
                      <div className={styles.rememberMeText}>Remember me</div> */}
                    </div>
                    <div className={styles.signInBtnContainer}>
                      <button type="submit" onSubmit={(e) => checkUser(e)} className={styles.signInBtn}>
                        Sign in
                      </button>
                    </div>
                    <div>
                      {"Don't have an account? Click "}
                      <Link href="/signup" className={styles.linkText}>
                        here!
                      </Link>
                    </div>
                    {/* <div className='text-[12px] font-[500] text-center'>&nbsp;</div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;