import { useState } from "react";
import gitStyle from "../../../styles/GitHub.module.css";
import { studentsState } from "../../state";
import { useRecoilState } from "recoil";
import axios from "axios";
import Image from "next/image";

const GitHubModal = ({ showGitHubModal, setShowGitHubModal, onClose }) => {
  const [gitHubAccount, setGitHubAccount] = useRecoilState(studentsState);
  // console.log(gitHubAccount[0].github);

  // not complete
  const addGitHubAccount = () => {
    axios({
      method: "post",
      url: `/api/students`,
      data: {
        github: "",
      },
    });
  };

  return (
    <>
      {showGitHubModal ? (
        <div>
          <div className={gitStyle.background} onClick={onClose}></div>
          <div className={gitStyle.gitContainer}>
            <div className={gitStyle.top_bar}></div>
            <div>
              <div className={gitStyle.listHeader}>
                <div>
                  <div className={gitStyle.headerInfo}>
                    <div className={gitStyle.info}>
                      <svg className={gitStyle.personIcon}>
                        <path
                          fillRule="evenodd"
                          d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"
                        ></path>
                      </svg>{" "}
                      2 members{" "}
                    </div>
                  </div>
                </div>
                <div onClick={onClose} className={gitStyle.close}></div>
              </div>
              <ul className={gitStyle.tableList}>
                <li className={gitStyle.tableListItem}>
                  <div className={gitStyle.tableListCell}>
                    <span className={gitStyle.frameLeft}>
                      <a className={gitStyle.frameInline} href="#">
                        <Image
                          src="/pic1.jpg"
                          height="44"
                          width="44"
                          className={gitStyle.avatar}
                        />
                      </a>
                    </span>
                  </div>
                  <div className={gitStyle.tableListName}>
                    <a className={gitStyle.frameInclineName}> Student 1 </a>
                    <span className={gitStyle.codeName}>
                      TantalizingTickler
                    </span>
                  </div>
                </li>
                <li className={gitStyle.tableListItem}>
                  <div className={gitStyle.tableListCell}>
                    <span className={gitStyle.frameLeft}>
                      <a className={gitStyle.frameInline} href="#">
                        <Image
                          src="/pic1.jpg"
                          height="44"
                          width="44"
                          className={gitStyle.avatar}
                        />
                      </a>
                    </span>
                  </div>
                  <div className={gitStyle.tableListName}>
                    <a className={gitStyle.frameInclineName}> Student 2 </a>
                    <span className={gitStyle.codeName}> BurtMFReynolds</span>
                  </div>
                </li>
              </ul>
            </div>
            <ul className={gitStyle.tableList}>
              <li className={gitStyle.tableListItem}>
                <div className={gitStyle.tableListCell}>
                  <span className={gitStyle.frameLeft}>
                    <a className={gitStyle.frameInline} href="#">
                      <div className={gitStyle.avatar}></div>
                    </a>
                  </span>
                </div>
                <div className={gitStyle.tableListName}>
                  <a className={gitStyle.frameInclineName}> Student 1 </a>
                  <span className={gitStyle.codeName}>TantalizingTickler</span>
                </div>
              </li>
              <li className={gitStyle.tableListItem}>
                <div className={gitStyle.tableListCell}>
                  <span className={gitStyle.frameLeft}>
                    <a className={gitStyle.frameInline} href="#">
                      <div className={gitStyle.avatar}></div>
                    </a>
                  </span>
                </div>
                <div className={gitStyle.tableListName}>
                  <a className={gitStyle.frameInclineName}> Student 2 </a>
                  <span className={gitStyle.codeName}> BurtMFReynolds</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GitHubModal;
