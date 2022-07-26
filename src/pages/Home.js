import { useState } from 'react';

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    </div>
  );
}
