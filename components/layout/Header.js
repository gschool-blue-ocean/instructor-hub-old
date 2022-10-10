import React from "react";
import headerStyle from "../../styles/Header.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { usersState, loggedIn } from "../state";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router"


const Header = () => {
  const [dropDown, showDropDown] = useState(false);
  const [users, setUsers] = useRecoilState(usersState);
  const [loggedInStatus, setLoggedInStatus] = useRecoilState(loggedIn)
  const router = useRouter();

  //function allows for logging out and rerouting to sign in page. Also resets the dropDown menu to the hidden state
  const logoutFunc = (e)=>{
    setLoggedInStatus(false);
    axios.get("/api/users").then((res) => {
      setUsers(res.data.users);
    });
    showDropDown(!dropDown)
    router.push("/")
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
            {(router.route !== "/" && router.route !== "/signup") ? (
              <button
              // the ternary is to make it so that you can't change the status when you are not logged in
                onClick={() => loggedInStatus ? showDropDown(!dropDown): ""}
                className={headerStyle.userButton}
                >
                {/* This shows the username of the person who is logged in */}
                {loggedInStatus ? `${users.username}`: "Sign In"}
                <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png" />
              </button>
            ): ""
            }
            <div
              className={headerStyle.dropDown}
              style={dropDown ? { display: "flex" } : { display: "none" }}
            >
              {/* this will allow the menu to only be shown if logged in */}
              {loggedInStatus ? (
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