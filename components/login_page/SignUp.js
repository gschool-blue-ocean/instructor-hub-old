import { useState } from 'react'
import styles from '../../styles/signUp.module.css'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { usersState } from '../state'
import axios from 'axios'

const SignUp = () => {
    const [username, setUsername] = useRecoilState(usersState);
    const [password, setPassword] = useRecoilState(usersState);
    const [default_cohort, setDefault_cohort] = useRecoilState(usersState);
    const [displayCohortModal, setDisplayCohortModal] = useState(false)
    const [displayAsanaKeyModal, setDisplayAsanaKeyModal] = useState(false)

    const createUsername= (e)=> {
        console.log(e.target.value)
        setUsername(e.target.value)
    }

    const createPassword = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    function showDisplayCohortModal(e){
        setDisplayCohortModal(true)
    }

    function createUserProfile() {
        axios.post('/api/users', {})
        .then(res.data[0])
    }

  return (
    <div className={styles.signUpContainer}>
        <div className={styles.signUpLargeTextContainer}>
            <div className={styles.signUpLargeText1}>
                <div className={styles.signUpLargeText2}>
                    <div className={styles.signUpLargeText3}>
                        <div className={styles.signUpLargeText4}>
                            Create Your Account
                        </div>
                    </div>
                    <div className={styles.signUpContainer2}>
                        <div className={styles.signUpFormContainer}>
                            <form className={styles.signUpForm}>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Username
                                    </div>
                                    <input className={styles.inputFields} onChange={(e) => createUsername(e)} type='text' required></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Password
                                    </div>
                                    <input className={styles.inputFields} onChange={(e) => createPassword(e)} type='password' required></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Confirm Password
                                    </div>
                                    <input className={styles.inputFields} type='password' required></input>
                                </div>
                                
                                {/* <div className={styles.cohortSelectorDiv}>{'Select Cohort: '}
                                    <select className={styles.cohortSelector}> */}
                                        {/* add a for each so that it will auto create the options for us*/}
                                        {/* <option value="">MCSP-13 Bravo</option>
                                        <option value="">MCSP-13 Alpha</option>
                                        <option value="">MCSP-12</option>
                                        <option value="">MCSP-11</option>
                                    </select> */}
                                {/* </div> */}
                                <div className={styles.accessTokenDiv}>
                                    {'Asana API KEY: '}
                                    <input type='text' className={styles.inputTokenField} placeholder='Required' required></input>
                                </div>
                                <div className={styles.signInBtnContainer}>
                                    <button type='submit' className={styles.signInBtn} onClick={(e) => showDisplayCohortModal(e)}>Create Account</button>
                                </div>
                                <div>
                                    {"Already have an account? Click "}
                                    <a href='/' className={styles.linkText}>here</a>
                                    {" to sign in."}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp