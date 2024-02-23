import { useParams } from 'react-router-dom';

const StudentView = () => {
  const { id } = useParams();

  return (
    <div>StudentView</div>
  )
}

export default StudentView