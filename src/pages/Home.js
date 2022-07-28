import { useContext, useEffect, useState } from 'react';

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

import { DiaryStateContext } from '../contexts';

import DiaryList from '../components/DiaryList';

export default function Home() {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // 선택한 달의 가장 첫 일, 말일을 구하기
    if (diaryList.length < 1) {
      return;
    }

    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getTime();

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getTime();

    setData(
      diaryList.filter(item => item.date >= firstDay && item.date <= lastDay),
    );
  }, [diaryList, currentDate]);

  useEffect(() => {}, [data]);

  const headText = `
    ${currentDate.getFullYear()}년 
    ${currentDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
      ),
    );
  };

  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate(),
      ),
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
}
