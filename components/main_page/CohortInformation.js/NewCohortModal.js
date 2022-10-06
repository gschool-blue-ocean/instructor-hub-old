import { useState } from 'react'
import styles from '../../../styles/NewCohortModal.module.css'

const NewCohortModal = ({showNewCohortModal, newCohortModal, onClose}) => {


    return (
        <>
            {newCohortModal ? (
                <>
                    <div className={styles.modalOverlay} onClick={onClose}/>
                    
                    <div className={styles.newCohortModal}>
                        
                    </div>
                </>
            ) : null}
        </>
  )
}

export default NewCohortModal