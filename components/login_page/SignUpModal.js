import axios from 'axios';
import { useState } from 'react'
import styles from '../../styles/SignUpModal.module.css'
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { loggedIn, usersState, cohortsState, studentsState } from "../state"


const SignUpModal = ({displayCohortModal, /*listOfCohorts,*/cohorts, password, username, asana_access_token, onClose }) => {
    const [default_cohort, setDefault_Cohort] = useState('');
    const [defaultCohortGid, setDefaultCohortGid] = useState('');
    const [cohort_asana_gid, setCohort_Asana_Gid] = useState('');
    const [loggedInStatus, setLoggedInStatus] = useRecoilState(loggedIn)
    const [user, setUser] = useRecoilState(usersState);
    const [students, setStudents] = useRecoilState(studentsState)
    const router = useRouter();

    const selectedCohort = (e) => {
        setCohort_Asana_Gid(e.target.value);
        for(let i = 0; i<cohorts.length; i++){
            if(e.target.value === cohorts[i].gid){
                setDefault_Cohort(cohorts[i].name)
                setDefaultCohortGid(cohorts[i])
            }
        }
        console.log(cohorts, 'made it here')
    }

    const getStudents = () => {
        console.log(defaultCohortGid, "Cohort GID")
        axios.get(`https://app.asana.com/api/1.0/tasks/?project=${defaultCohortGid.gid}`, {
            headers: {
                Authorization: `Bearer ${asana_access_token}`,
            },
        }).then((res) => {
            (res.data.data).forEach((asanaStudent) => {
                const found = students.find(element => element.gid === asanaStudent.gid)
                if(found === undefined){
                    console.log(asanaStudent, "success student")
                    axios.put('/api/students', {
                        "name": `${asanaStudent.name}`,
                        "cohort": `${defaultCohortGid.name}`,
                        "gid": `${asanaStudent.gid}`
                    }).then((res)=> setStudents((prev) => [...prev, ...res.data]))
                }
            })
        })
    }

    const saveUserInfo = () => {
        axios.post('/api/users', {
            "username": username,
            "password": password,
            "default_cohort": default_cohort,
            "asana_access_token": asana_access_token,
            "gid": cohort_asana_gid
        }).then((res) =>{
            console.log(res.data)
         setUser(res.data)
        })
        sessionStorage.setItem('logged_in_Status', 'true');
        setLoggedInStatus(true)
        getStudents();
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
                            {/* {listOfCohorts.map(ele=> { */}
                            {cohorts.map(ele=> {
                                return(
                                    <option key={ele.gid} value={ele.gid} required>{ele.name}</option>
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