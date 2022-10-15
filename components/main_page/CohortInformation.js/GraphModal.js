import { useState } from "react";
import { useRecoilState } from "recoil";
import { studentsState, currentCohortState, cohortsState, studentIdState } from "../../state.js";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import graphStyle from "../../../styles/GraphModal.module.css";
import { Line } from 'react-chartjs-2';
import axios from "axios";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const GraphModal = ({ showGraphModal, setShowGraphModal, onClose }) => {
   
    return (
      <>
        {showGraphModal ? (
        <div>
            <div className={graphStyle.background} onClick={onClose}></div>
                <div className={graphStyle.container}>
                    <div className={graphStyle.topBar}></div>
                        <div>
                            <div className={graphStyle.topContainer}>
                                <div>
                                    <div onClick={onClose} className={graphStyle.close}></div>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
        ) : null}
      </>
    );
  };
  
  export default GraphModal;