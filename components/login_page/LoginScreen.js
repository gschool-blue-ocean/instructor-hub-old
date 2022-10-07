import SignUp from "./SignUp.js";
import styles from "../../styles/signUp.module.css";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { usersState } from "../state.js";

const LoginScreen = () => {
  const [user, setUser] = useRecoilState(usersState);
  // get request from asana then post request to our database
  console.log(user);
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
                      <input
                        className={styles.inputFields}
                        type="text"
                        required
                      ></input>
                    </div>
                    <div className={styles.accountInputContainer}>
                      <div className={styles.signUp}>Password</div>
                      <input
                        className={styles.inputFields}
                        type="password"
                        required
                      ></input>
                    </div>
                    <div className={styles.rememberMeContainer}>
                      <input
                        type="checkbox"
                        className={styles.rememberMeCheckBox}
                      ></input>
                      <div className={styles.rememberMeText}>Remember me</div>
                    </div>
                    <div className={styles.signInBtnContainer}>
                      <Link href="/home">
                        <button type="submit" className={styles.signInBtn}>
                          Sign in
                        </button>
                      </Link>
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
