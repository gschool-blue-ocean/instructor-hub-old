import { useState } from 'react'
import styles from '../../styles/NewCohortModal.module.css'


const SignUpModal = ({setDisplayCohortModal, displayCohortModal, listOfCohorts, onClose}) => {

    return (
        <>
            {displayCohortModal ? (
                <>
                    <div className={styles.modalOverlay} onClick={onClose}/>
                    <div className={styles.newCohortModal}>
                       <label>Please Select Your Default Cohort.</label>
                       <select>
                            {listOfCohorts.map((e)=>{
                                <option value={e["name"]} key={e.gid}>{`${e["name"]}`}</option>
                            })}
                       </select>
                    </div>
                </>
            ) : null}
        </>
  )
}

export default SignUpModal