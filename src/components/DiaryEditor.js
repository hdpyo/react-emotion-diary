import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_description: '완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_description: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_description: '보통',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_description: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_description: '끔찍함',
  },
];

function DiaryEditor() {
  const navigate = useNavigate();

  const getStringDate = date => {
    // yyyy-MM-dd 형식으로 반환하기
    return date.toISOString().slice(0, 10);
  };

  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmotion = emotion => {
    setEmotion(emotion);
  };

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
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map(item => (
              <EmotionItem
                key={item.emotion_id}
                onClick={handleClickEmotion}
                isSelected={item.emotion_id === emotion}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
