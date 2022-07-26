import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function New() {
  const navigate = useNavigate();

  const getStringDate = date => {
    // yyyy-MM-dd 형식으로 반환하기
    return date.toISOString().slice(0, 10);
  };

  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div>
      <MyHeader
        headText={'새 일기 쓰기'}
        leftChild={
          <MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input
              className="input-date"
              type="date"
              name=""
              id=""
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default New;
