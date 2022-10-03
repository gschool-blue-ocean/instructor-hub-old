import React from 'react'
import styles from '../../styles/signUp.module.css'
import Link from 'next/link'

const SignUp = () => {
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
                                        Email Address
                                    </div>
                                    <input className={styles.inputFields} type='email'></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Password
                                    </div>
                                    <input className={styles.inputFields} type='password'></input>
                                </div>
                                <div className={styles.accountInputContainer}>
                                    <div className={styles.signUp}>
                                        Confirm Password
                                    </div>
                                    <input className={styles.inputFields} type='password'></input>
                                </div>
                                {/* <div className='flex flex-row items-center cursor-pointer font-serif font-normal text-[12px]'>
                                    <input type='checkbox' className='pt-[80px] pb-[150px] flex flex-col items-center font-normal font-serif text-[12px] cursor-pointer'></input>
                                    <div className='text-[12px] select-none pl-[6px] block cursor-pointer font-normal font-serif'>
                                        Remember me
                                    </div>
                                </div> */}
                                <div className={styles.signInBtnContainer}>
                                    <button type='submit' className={styles.signInBtn}>Create Account</button>
                                </div>
                                <div>
                                    {"Already have an account? Click "}
                                    <Link href='/'>here</Link>
                                    {" to sign in"}
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