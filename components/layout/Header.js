import React, { useEffect } from "react";
import headerStyle from "../../styles/Header.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { usersState } from "../state";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router"


const Header = () => {
  const [dropDown, showDropDown] = useState(false);
  const [users, setUsers] = useRecoilState(usersState);
  const router = useRouter();

  //function allows for logging out and rerouting to sign in page. Also resets the dropDown menu to the hidden state
  const logoutFunc = (e)=>{
    sessionStorage.clear();
    showDropDown(false)
    router.push("/")
  }
  const signInStatus = (e)=>{
    
    let loggedInUser = sessionStorage.getItem("user name");
    if(loggedInUser){
      return true
    } 
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
              <button onClick={() => signInStatus() ? showDropDown(!dropDown): ""} className={headerStyle.userButton}>
                {/* This shows the username of the person who is logged in */}
                {signInStatus() ? `${users.username}`: "Sign In"}
                <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png" />
              </button>
            ): ""}
            <div className={headerStyle.dropDown} style={dropDown ? { display: "flex" } : { display: "none" }}>
              {/* this will allow the menu to only be shown if logged in */}
              {signInStatus ? (
                <>
                  <a onClick={(e) =>logoutFunc(e)}>Logout</a>
                  <a>Settings</a>
                  <a>Cohort</a>
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