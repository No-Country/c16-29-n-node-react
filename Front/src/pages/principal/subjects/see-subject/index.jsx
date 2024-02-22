import { useParams } from 'react-router-dom';

const SubjectView = () => {
  const { id } = useParams();

  return (
    <div>SubjectView</div>
  )
}

export default SubjectView