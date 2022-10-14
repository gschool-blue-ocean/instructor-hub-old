import { Menu, Listbox } from '@headlessui/react'
import overallStyles from "../../../styles/CohortOverall.module.css";
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { studentsState } from '../../state'

// to be used with the inner Listbox dropdown below
const nums = [
    { id: 1, num: 1, unavailable: false },
    { id: 2, num: 2, unavailable: false },
    { id: 3, num: 3, unavailable: false },
    { id: 4, num: 4, unavailable: true },
    { id: 5, num: 5, unavailable: false },
  ]


const GroupMaker = () => {

    const [student, setStudent] = useRecoilState(studentsState);
    const [selectedNumber, setSelectedNumber] = useState(nums[0])
    const [display, setDisplay] = useState('display here');
    const [customOpen, setCustomOpen] = useState(false);
    const [toggle, setToggle] = useState(false);

    console.log(student);


    function buttonClicked() {
      setCustomOpen(prev => !prev);
    }

    function createGroups() {

    }


return (
    <>
    {/* overall dropdown menu */}
    <Menu>
      {({open}) => (
        <>
          <Menu.Button onClick={buttonClicked}>More</Menu.Button>
          {customOpen && (
          <Menu.Items static>
            {/* individual menu item. add another Menu.Item and whatever divs inside of that if you'd like more */}
            <Menu.Item>
              {/* this is where the inner dropdown where the user can choose however many of groups they want made */}
                <Listbox as="div" value={selectedNumber} onChange={setSelectedNumber}>
                  {/* the button to activate the actual inner dropdown itself */}
                    <Listbox.Button>{selectedNumber.num}</Listbox.Button>
                    {/* the dropdown items that are displayed by mapping the above nums array */}
                    <Listbox.Options>
                        {nums.map((number) => (
                            <Listbox.Option
                                key={number.id}
                                value={number}
                                disabled={number.unavailable}
                            >
                            {number.num}
                        </Listbox.Option>
                        ))}
                    </Listbox.Options>
                    {/* this is where the group making functionality is located in the entire Menu */}
                <button as="div" onClick={() => setToggle(true)}>Create Groups!</button>
                <div as="div">
                  {toggle ? 
                    <div as="div">
                      {student.map((s) => (
                        <div as="div" key="student_key">
                          {s.name}
                        </div>
                      ))}
                    </div>
                  : !toggle }
                </div>
                </Listbox>
            </Menu.Item>
            {/* <Menu.Item>
              
            </Menu.Item> */}
          </Menu.Items>)
          }
        </>
      )
      }
    </Menu>
  </>
  )
}

export default GroupMaker