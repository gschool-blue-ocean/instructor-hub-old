import axios from 'axios';
import { useState } from 'react'
import styles from '../../styles/NewCohortModal.module.css'
import { useRouter } from "next/router"


const SignUpModal = ({displayCohortModal, listOfCohorts, password, username, asana_access_token, onClose }) => {
    const [default_cohort, setDefault_Cohort] = useState('');
    const [cohort_asana_gid, setCohort_Asana_Gid] = useState('');
    const router = useRouter();

    const selectedCohort = (e) => {
        setCohort_Asana_Gid(e.target.value);
        for(let i = 0; i<listOfCohorts.length; i++){
            if(e.target.value === listOfCohorts[i].gid){
                setDefault_Cohort(listOfCohorts[i].name)
            }
        }
        console.log(listOfCohorts, 'made it here')
    }

    const saveUserInfo = () => {
        axios.post('/api/users', {
            "username": username,
            "password": password,
            "default_cohort": default_cohort,
            "is_instructor": true, //try to get rid of this from the backend
            "asana_access_token": asana_access_token,
            "cohort_asana_gid": cohort_asana_gid
        }).then((res) => console.log(res.data))
        router.push("/home")
    }

    return (
        <>
            {displayCohortModal ? (
                <>
                    <div className={styles.modalOverlay} onClick={onClose}/>
                    <div className={styles.newCohortModal}>
                       <label>Please Select Your Default Cohort.</label>
                       <select onChange={(e)=>selectedCohort(e)}>
                            <option value="" selected disabled hidden>Choose default here</option>
                            {listOfCohorts.map(ele=> {
                                return(
                                    <option key={ele.gid} value={ele.gid} >{ele.name}</option>
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