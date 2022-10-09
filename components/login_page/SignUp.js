import { useState } from 'react';
import styles from '../../styles/signUp.module.css';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { usersState } from '../state';
import axios from 'axios';
import SignUpModal from './SignUpModal';

const SignUp = () => {
    // const [users, setUsers] = useRecoilState(usersState);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [default_cohort, setDefault_cohort] = useRecoilState(usersState);
    const [displayCohortModal, setDisplayCohortModal] = useState(false)
    const [displayAsanaKeyModal, setDisplayAsanaKeyModal] = useState(false)
    const [listOfCohorts, setListOfCohorts] = useState([])
    const [asana_access_token, setAsana_Access_Token] = useState('')

    const createUsername= (e)=> {
        setUsername(e.target.value)
    }

    const createPassword = (e) => {
        setPassword(e.target.value)
    }
    const passwordVerification = (e) =>{
        setConfirmPassword(e.target.value)
    }
    
    function showDisplayCohortModal(e){
        e.preventDefault();
        // if(confirmPassword === password && username.length >= 6 && password.length >= 8 && asanaToken){
            axios.get('https://app.asana.com/api/1.0/projects/', {
                headers: {
                    Authorization: `Bearer ${asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
                },
            }).then((res) => {
                setListOfCohorts(res.data.data)
                setDisplayCohortModal(!displayCohortModal)
            })
        // }else{
        //     if(username.length < 6){
        //         alert("Please enter a username with 6 or more characters.")
        //     } 
        //     if(password.length < 8){
        //         alert("Please enter a password with 8 or more characters.")
        //     }
        //     if(!asanaToken){
        //         alert("Please enter your Asana API Key.")
        //     }
        //     if(confirmPassword !== password){
        //         alert("Please verify that your passwords match.")
        //     }
        // }
    }

    function createToken(e) {
        setAsana_Access_Token(e.target.value)
    }

   
       

  return (
    <>
    <SignUpModal 
        displayCohortModal={displayCohortModal} 
        listOfCohorts={listOfCohorts}
        asana_access_token={asana_access_token}
        password={password}
        username={username}
        onClose={() => {
            setDisplayCohortModal(false)
        }}
    />
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
                                    <input className={styles.inputFields} onChange={(e) => createUsername(e)} type='text'  minLength="6" required></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Password
                                    </div>
                                    <input className={styles.inputFields} onChange={(e) => createPassword(e)} type='password' minLength="8" required></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Confirm Password
                                    </div>
                                    <input className={styles.inputFields} type='password' onChange={(e) =>passwordVerification(e)} minLength="8" required></input>
                                </div>
                                <div className={styles.accessTokenDiv}>
                                    {'Asana API KEY: '}
                                    <input type='text' className={styles.inputTokenField} placeholder='Required' onChange={(e) => createToken(e)} required></input>
                                </div>
                                <div className={styles.signInBtnContainer}>
                                    <button type='button' className={styles.signInBtn} onClick={(e) => showDisplayCohortModal(e)}>Create Account</button>
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
    </>
  )
}

export default SignUp