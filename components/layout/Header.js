import React, { useEffect } from "react";
import headerStyle from "../../styles/Header.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { usersState, loggedIn, currentCohortState, cohortsState } from "../state";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router"


const Header = () => {
  const [dropDown, showDropDown] = useState(false);
  const [users, setUsers] = useRecoilState(usersState);
  const [loggedInStatus, setLoggedInStatus] = useRecoilState(loggedIn)
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [defaultCohort, setDefaultCohort] = useState("");
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const router = useRouter();

  useEffect(() => {
    if (users) {
      setCurrentCohort(users.default_cohort);
      console.log(currentCohort)
    }
  }, [users]);

  //function allows for logging out and rerouting to sign in page. Also resets the dropDown menu to the hidden state
  const logoutFunc = ()=>{
    showDropDown(false)
    axios.get("/api/users").then((res)=>setUsers(res.data.users))
    router.push("/")
  }
  const signInStatus = ()=>{
    if(loggedInStatus){
      return true
    }
  }

  const newDefault = (e) => {
    let userId = users.user_id
    axios.patch(`/api/users/${userId}`, {
      "default_cohort" : `${e.target.value}`
    })
      .then((res) => {
        console.log(res.data)
        setUsers(users);
      })
  }



  return (
    <>
      <header className={headerStyle.header}>
        <div className={headerStyle.wrapper}>
          <div className={headerStyle.logoDiv}>
            {/* <Image src='/logo2.png' width={80} height={80}/> */}
            GALVANIZE
          </div>
          <div className={headerStyle.userDropDown}>
            {/* this is to make it so the sign In button doesn't show on the login or signup pages */}
            {(router.route !== "/" && router.route !== "/signup") ? (
              // the ternary is to make it so that you can't change the status when you are not logged in
              <button onClick={() => signInStatus() ? showDropDown(!dropDown): logoutFunc()} className={headerStyle.userButton}>
                {/* This shows the username of the person who is logged in */}
                {signInStatus() ? `${users.username}`: "Sign In"}
                <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png" />
              </button>
            ): ""}
            <div className={headerStyle.dropDown} style={dropDown ? { display: "flex" } : { display: "none" }}>
              {/* this will allow the menu to only be shown if logged in */}
              {signInStatus ? (
                <>
                  <a onClick={() =>logoutFunc()}>Logout</a>
                  <select name={currentCohort}>
                    <option value= "" disabled selected hidden>Choose A Cohort</option>
                    {/* <option value={currentCohort}>{currentCohort}</option> */}
                    {cohorts.filter((course) => course.name !== currentCohort).map((cohortList) => (
                      <option onChange={(e) => newDefault(e)} key= {cohortList.cohort_id} value={cohortList.name}>{cohortList.name}</option>
                    ))}
                  </select>
                </>
              ): ""}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;