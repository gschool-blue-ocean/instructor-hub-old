import React from "react";
import styles from "../../styles/signUp.module.css";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { usersState } from "../state";

const SignUp = () => {
  const [user, setUser] = useRecoilState(usersState);
  console.log(user);
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpLargeTextContainer}>
        <div className={styles.signUpLargeText1}>
          <div className={styles.signUpLargeText2}>
            <div className={styles.signUpLargeText3}>
              <div className={styles.signUpLargeText4}>Create Your Account</div>
            </div>
            <div className={styles.signUpContainer2}>
              <div className={styles.signUpFormContainer}>
                <form className={styles.signUpForm}>
                  <div className={styles.accountInputContainer}>
                    <div className={styles.signUp}>Username</div>
                    <input className={styles.inputFields} type="text"></input>
                  </div>
                  <div className={styles.accountInputContainer}>
                    <div className={styles.signUp}>Password</div>
                    <input
                      className={styles.inputFields}
                      type="password"
                    ></input>
                  </div>
                  <div className={styles.accountInputContainer}>
                    <div className={styles.signUp}>Confirm Password</div>
                    <input
                      className={styles.inputFields}
                      type="password"
                    ></input>
                  </div>

                  <div className={styles.cohortSelectorDiv}>
                    {"Select Cohort: "}
                    <select className={styles.cohortSelector}>
                      {/* add a for each so that it will auto create the options for us*/}
                      <option value="volvo">MCSP-13 Bravo</option>
                      <option value="saab">MCSP-13 Alpha</option>
                      <option value="fiat">MCSP-12</option>
                      <option value="audi">MCSP-11</option>
                    </select>
                  </div>
                  <div className={styles.accessTokenDiv}>
                    {"Asana API KEY: "}
                    <input
                      type="text"
                      className={styles.inputTokenField}
                      placeholder="Optional"
                    ></input>
                  </div>
                  <div className={styles.signInBtnContainer}>
                    <button type="submit" className={styles.signInBtn}>
                      Create Account
                    </button>
                  </div>
                  <div>
                    {"Already have an account? Click "}
                    <a href="/" className={styles.linkText}>
                      here
                    </a>
                    {" to sign in."}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
