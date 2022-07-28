import { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { DiaryStateContext } from '../contexts';

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

function Diary() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        diary => parseInt(id) === parseInt(diary.id),
      );

      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary);
      } else {
        // 일기가 존재하지 않을 때
        alert('존재하지 않는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩 중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      item => parseInt(item.emotion_id) === parseInt(data.emotion),
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={getStringDate(new Date(data.date))}
          leftChild={
            <MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={'수정하기'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                'diary_img_wrapper',
                `diary_img_wrapper_${data.emotion}`,
              ].join(' ')}
            >
              <img src={curEmotionData.emotion_img} alt="" />
              <div className="emotion_description">
                {curEmotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
