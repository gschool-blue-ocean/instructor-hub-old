import { useState } from 'react';
import styles from '../../styles/signUp.module.css';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { cohortsState, usersState, accessToken, studentsState } from '../state';
import axios from 'axios';
import SignUpModal from './SignUpModal';
import { bodyStreamToNodeStream } from 'next/dist/server/body-streams';

const SignUp = () => {
    // const [users, setUsers] = useRecoilState(usersState);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [default_cohort, setDefault_cohort] = useRecoilState(usersState);
    const [cohorts, setCohorts] = useRecoilState(cohortsState);
    const [displayCohortModal, setDisplayCohortModal] = useState(false)
    const [displayAsanaKeyModal, setDisplayAsanaKeyModal] = useState(false)
    const [listOfCohorts, setListOfCohorts] = useState([])
    const [asana_access_token, setAsana_Access_Token] = useRecoilState(accessToken)
    const [students, setStudents] = useRecoilState(studentsState)
    const [duplicateAccounts, setDuplicateAccounts] = useState(false)

    const createUsername= (e)=> {
        setUsername(e.target.value)
    }

    const createPassword = (e) => {
        setPassword(e.target.value)
    }
    const passwordVerification = (e) =>{
        setConfirmPassword(e.target.value)
    }
    function duplicateCheck(){
        axios.get('/api/users').then((res) => {
            let duplicated = res.data.users.find((existingAccount) => existingAccount.username === username)
            if(duplicated){
                alert(`${username} already exists.`)
                setDuplicateAccounts(true)
            }else{
                setDuplicateAccounts(false)
            }
        }).then(()=> {
            console.log(duplicateAccounts)
            return
        })
    }
    async function showDisplayCohortModal(e){
        e.preventDefault();
        duplicateCheck()
        // console.log(duplicateAccounts)
        if(confirmPassword === password && username.length >= 6 && password.length >= 8 && asana_access_token && !duplicateAccounts){
            axios.get('https://app.asana.com/api/1.0/projects/', {
                headers: {
                    Authorization: `Bearer ${asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
                },
            }).then((res) => {
                (res.data.data).forEach((asanaCohort) => {
                    const found = cohorts.find(element => element.gid === asanaCohort.gid)
                    if(found === undefined){
                        // console.log(asanaCohort, "success on signup")
                        axios.put('/api/cohorts', {
                            "name": `${asanaCohort.name}`,
                            "gid": `${asanaCohort.gid}`
                        }).then((res)=> setCohorts((prev) => [...prev, ...res.data]))
                    }else{
                        console.log("failed on signup")
                    }
                })
                // setCohorts((prev) => [...prev, ...res.data.data])
                setDisplayCohortModal(!displayCohortModal)
                // console.log(res.data.data)
            })
            // .then(
            //     // console.log(cohorts)
            //     setCohorts((prev) => [...prev, ...cohorts])
            // )
        }else{
            if(username.length < 6){
                document.getElementById('username').border = "2px solid red"
                alert("Please enter a username with 6 or more characters.")
            } 
            if(password.length < 8){
                alert("Please enter a password with 8 or more characters.")
                document.getElementById('password').border = "2px solid red"
            }
            if(!asana_access_token){
                alert("Please enter your Asana API Key.")
                document.getElementById('asanaToken').border = "2px solid red"
            }
            if(confirmPassword !== password){
                document.getElementById('password').border = "2px solid red"
                alert("Please verify that your passwords match.")
                document.getElementById('confirmPassword').border = "2px solid red"
            }
        }
    }

    function createToken(e) {
        setAsana_Access_Token(e.target.value)
    }

  return (
    <>
    <SignUpModal 
        displayCohortModal={displayCohortModal} 
        // listOfCohorts={listOfCohorts}
        cohorts={cohorts}
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
                                    <input id='username' className={styles.usernameField} onChange={(e) => createUsername(e)} type='text' required></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Password
                                    </div>
                                    <input id="password" className={styles.passwordFields} onChange={(e) => createPassword(e)} type='password' required></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Confirm Password
                                    </div>
                                    <input id="confirmPassword" className={styles.passwordFields} type='password' onChange={(e) =>passwordVerification(e)} required></input>
                                </div>
                                <div className={styles.accessTokenDiv}>
                                    {'Asana API KEY: '}
                                    <input type='text' id='asanaToken' className={styles.inputTokenField} placeholder='Required' onChange={(e) => createToken(e)} required></input>
                                </div>
                                <div className={styles.signInBtnContainer}>
                                    <button type='button' className={styles.signInBtn} onClick={(e) => showDisplayCohortModal(e)}>Create Account</button>
                                </div>
                                <div>
                                    {"Already have an account? Click "}
                                    <Link href='/' className={styles.linkText}>
                                      <span  className={styles.linkText}> here</span> 
                                    </Link>
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