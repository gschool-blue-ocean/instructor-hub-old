import SignUp from "./SignUp.js";
import styles from "../../styles/signUp.module.css";
import Link from "next/link";
import { useState } from "react"
import { useRecoilState } from "recoil";
import { usersState } from "../state.js";

const LoginScreen = () => {
  const [user, setUser] = useRecoilState(usersState);
  const [enteredUsername, setEnteredUsername] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")
  // get request from asana then post request to our database
  const usernameFunc = (e) => {
    console.log(user)
    console.log(e.target.value)
    setEnteredUsername(e.target.value)
  }
  const passwordFunc = (e) => {
    console.log(e.target.value)
    setEnteredPassword(e.target.value)
  }
  const checkUser = (e) =>{
    e.preventDefault()
    user.filter( (e) => {
      if(e.username === enteredUsername && e.password === enteredPassword){
        return( 
          <Link href="/home" />
        )
      }
    })
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
                  <form className={styles.signUpForm}>
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
                      {/* <Link href="/home"> */}
                        <button type="submit" onSubmit={(e)=> checkUser(e)} className={styles.signInBtn}>
                          Sign in
                        </button>
                      {/* </Link> */}
                    </div>
                    <div>
                      {"Don't have an account? Click "}
                      <a href="/signup" className={styles.linkText}>
                        here!
                      </a>
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