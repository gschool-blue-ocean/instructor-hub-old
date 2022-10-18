import styles from "../../../styles/GroupMaker.module.css";
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { studentsState, groupsState, currentCohortState } from '../../state'



const GroupMaker = () => {
    // REPLACE STUDENTS WITH STUDENTS IN COHORT OK
    const [students, setStudents] = useRecoilState(studentsState);
    const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)
    const [groups, setGroups] = useRecoilState(groupsState)
    const [display, setDisplay] = useState('display here');
    const [groupSize, setGroupSize] = useState(false);
    const [enough, setEnough] = useState(true);
    const [groupNumber, setGroupNumber] = useState(0);
    const [mixedStudents, setMixedStudents] = useState([])
    // const [cohortStudents, setCohortStudents] = useState([]);

    useEffect(() => {
      if (!enough) {
        setTimeout(() => {
          setEnough(true);
        }, '3000')
      }
    }, [enough])

    // useEffect(() => {
    //   // if (mixedStudents) {
    //   //   console.log('arr', mixedStudents);
    //   // }
    //   setMixedStudents(students)
    // }, [])

    useEffect(() => {
      console.log(groupNumber)
    }, [groupNumber])

    useEffect(() => {
      console.log(groups)
    }, [groups])

    // const test = () => {
    //   setMixedStudents((array) => {
    //     for(let i = array.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1));
    //       [array[i], array[j]] = [array[j], array[i]]
    //     }
    //   })
    //   console.log(mixedStudents)
    // }

    const createGroup = () => {
      if (groupNumber == null) return;
      if (groupNumber > students.length) {
        setEnough(false);
        return;
      }

      const shuffle = (array) => {
        for(let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
      }
      
  

      let arr = [...students];
      console.log('arr', arr);
      shuffle(arr)
      let groupObj = {};

      if (groupNumber == 2) {
        let acc = 1

          for (let student of arr) {
            if (acc > 2) {
              acc = 1;
            }
            if (!groupObj[acc]) {
              groupObj[acc] = [];
            }
            groupObj[acc].push(student.name)
            acc++
          }
      }
      if (groupNumber == 3) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 3) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 4) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 4) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 5) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 5) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 6) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 6) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 7) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 7) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 8) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 8) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 9) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 9) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 10) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 10) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 11) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 11) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 12) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 12) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 13) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 13) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 14) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 14) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      if (groupNumber == 15) {
        let acc = 1;
        for (let student of arr) {
          if (acc > 15) {
            acc = 1;
          }
          if (!groupObj[acc]) {
            groupObj[acc] = [];
          }
          groupObj[acc].push(student.name)
          acc++
        }
      }
      // console.log(students)
      setGroups(groupObj)
    }

    return (
      <>
        <div className={styles.groupmakerDiv}>
          {!enough ? (
            <div className={styles.warning}>
              There are not enough students in the cohort!
            </div>
          ) : ('')}
          <div className={styles.selectorDiv}>
            <select id="dropdown" className={styles.selector} onChange={(e) => setGroupNumber(prev => e.target.value)}>
              <option value={null}>Number of Groups</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
            </select>
            <button onClick={createGroup} className={`${styles.selector} ${styles.button}`} id='button'>Create Groups</button>
          </div>
        </div>
      </>
    )
}

export default GroupMaker