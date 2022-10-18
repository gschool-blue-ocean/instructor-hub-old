import SignUp from "./SignUp.js";
import styles from "../../styles/signUp.module.css";
import Link from "next/link";
import { useState } from "react"
import { useRecoilState } from "recoil";
import { usersState, loggedIn, currentCohortState } from "../state.js";
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import { parseCookies } from "../../components/login_page/SignUp"


const LoginScreen = () => {
  const [user, setUser] = useRecoilState(usersState);
  const [enteredUsername, setEnteredUsername] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")
  const [verifiedUser, setVerifiedUser] = useRecoilState(loggedIn)
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)
  const [cookie, setCookie] = useCookies(["user"])
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
        setCurrentCohort(element.default_cohort)
        router.push("/home")
        // return {data: enteredUsername}
      }
    }
  }
  
  // const handleSignIn = async () => {
  //   try {
  //     const response = await checkUser(e) //handle API call to sign in here.
  //     const data = response.data

  //     setCookie("user", JSON.stringify(data), {
  //       path: "/home",
  //       maxAge: 3600, // Expires after 1hr
  //       sameSite: true,
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


//   <p>Data from cookie: {data.user}</p>
//   FullPage.getInitialProps = async ({ req, res }) => {
// const data = parseCookies(req)

// if (res) {
// if (Object.keys(data).length === 0 && data.constructor === Object){
// res.writeHead(301, { Location: "/home" })
// res.end()
// }
// }

// return {
// data: data && data,
// }
// }



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
                  {/* <form className={styles.signUpForm} onSubmit={(e)=>handleSignIn(e)}> */}
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
                      {/* <button type="submit" onSubmit={(e) => handleSignIn(e)} className={styles.signInBtn}> */}
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