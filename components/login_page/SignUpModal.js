import axios from 'axios';
import { useState } from 'react'
import styles from '../../styles/NewCohortModal.module.css'
import { usersState } from '../state';


const SignUpModal = ({displayCohortModal, listOfCohorts, password, username, asana_access_token, onClose }) => {
    const [default_cohort, setDefault_Cohort] = useState('');
    const [cohort_asana_gid, setCohort_Asana_Gid] = useState(usersState);
    // const [, ] = useRecoilState();

    const selectedCohort = (e) => {
        setDefault_Cohort(e.name);
        console.log(e.gid)
        setCohort_Asana_Gid(e.gid);
    }

    const saveUserInfo = () => {
        axios.post('/api/users', {
            "username": username,
            "password": password,
            "default_cohort": default_cohort,
            "is_instructor": true,
            "asana_access_token": asana_access_token,
            "cohort_asana_gid": cohort_asana_gid
        }).then((res) => console.log(res.data))
    }

    return (
        <>
            {displayCohortModal ? (
                <>
                    <div className={styles.modalOverlay} onClick={onClose}/>
                    <div className={styles.newCohortModal}>
                       <label>Please Select Your Default Cohort.</label>
                       <select>
                            {listOfCohorts.map(ele=> {
                                return(
                                    <option key={ele.gid} value={ele.name} onClick={(ele)=> selectedCohort(ele)}>{ele.name}</option>
                                )
                            })}
                       </select>
                       <button onClick={saveUserInfo}>Submit</button>
                    </div>
                </>
            ) : null}
        </>
  )
}

export default SignUpModal