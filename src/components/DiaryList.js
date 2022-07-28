import { useEffect, memo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import MyButton from './MyButton';
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { id: '1', value: 'latest', name: '최신순' },
  { id: '2', value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { id: '1', value: 'all', name: '전부 다' },
  { id: '2', value: 'good', name: '좋은 감정만' },
  { id: '3', value: 'bad', name: '안 좋은 감정만' },
];

// eslint-disable-next-line react/display-name
const ControlMenu = memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {optionList.map(item => (
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

function DiaryList({ diaryList }) {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - 일기 목록`;
  }, []);

  const getProcessedDiaryList = () => {
    const filterCallback = item => {
      if (filter === 'good') {
        return parseInt(item.emotion) > 3;
      } else {
        return parseInt(item.emotion) <= 3;
      }
    };

    // 최신순인지 오래된순인지 비교하는 함수
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 배열 깊은 복사
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정 필터링
    const filteredList =
      filter === 'all'
        ? copyList
        : copyList.filter(item => filterCallback(item));

    return filteredList.sort(compare);
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={'positive'}
            text={'새 일기 쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>

      {getProcessedDiaryList().map(item => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
