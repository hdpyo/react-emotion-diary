import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import MyHeader from './MyHeader';
import MyButton from './MyButton';

function DiaryEditor() {
  const navigate = useNavigate();

  const getStringDate = date => {
    // yyyy-MM-dd 형식으로 반환하기
    return date.toISOString().slice(0, 10);
  };

  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={'새 일기 쓰기'}
        leftChild={
          <MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
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

export default DiaryEditor;
