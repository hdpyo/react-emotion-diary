import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../contexts';
import DiaryEditor from '../components/DiaryEditor';

function Edit() {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (!diaryList.length) {
      return;
    }

    const targetDiary = diaryList.find(
      item => parseInt(item.id) === parseInt(id),
    );

    // 잘못된 일기 id 로 접근했을 경우 메인 화면으로 이동시킨다.
    if (targetDiary) {
      setOriginData(targetDiary);
    } else {
      navigate('/', { replace: true });
    }
  }, [diaryList, id]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;
