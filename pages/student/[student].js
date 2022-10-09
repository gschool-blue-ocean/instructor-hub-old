import StudentMainBody from '../../components/student_page/StudentMainBody.js'
import { useRouter } from 'next/router.js'

const student = () => {
  const router = useRouter(); 
  return (
    <div>
        <StudentMainBody />
    </div>
  )
}

export default student