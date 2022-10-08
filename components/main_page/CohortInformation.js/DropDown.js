import { Menu, Listbox } from '@headlessui/react'
import overallStyles from "../../../styles/CohortOverall.module.css";
import { useState } from 'react'

const nums = [
    { id: 1, num: 1, unavailable: false },
    { id: 2, num: 2, unavailable: false },
    { id: 3, num: 3, unavailable: false },
    { id: 4, num: 4, unavailable: true },
    { id: 5, num: 5, unavailable: false },
  ]


const GroupMaker = () => {

    const [selectedNumber, setSelectedNumber] = useState(nums[0])

    const [display, setDisplay] = useState('display here');
    const [customOpen, setCustomOpen] = useState(false);


    function buttonClicked() {
        setCustomOpen(prev => !prev);
    }


return (
    <>
    <Menu>
      {({open}) => (
        <>
          <Menu.Button onClick={buttonClicked}>More</Menu.Button>
          {customOpen && (
          <Menu.Items static>
            <Menu.Item>
                <Listbox as="div" value={selectedNumber} onChange={setSelectedNumber}>
                    <Listbox.Button>{selectedNumber.num}</Listbox.Button>
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
                </Listbox>
            </Menu.Item>
          </Menu.Items>)
          }
        </>
      )
      }
    </Menu>
    <br/><br/>
    <div>{display} was clicked</div>
  </>
  )
}

export default GroupMaker