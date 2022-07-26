import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import { useNavigate } from 'react-router-dom';

function New() {
  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headText={'새 일기 쓰기'}
        leftChild={
          <MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />
        }
      />
    </div>
  );
}

export default New;
