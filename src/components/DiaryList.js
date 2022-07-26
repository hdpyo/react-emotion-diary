import { useState } from 'react';

const sortOptionList = [
  { id: '1', value: 'latest', name: '최신순' },
  { id: '2', value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { id: '1', value: 'all', name: '전부 다' },
  { id: '2', value: 'good', name: '좋은 감정만' },
  { id: '3', value: 'bad', name: '안 좋은 감정만' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {optionList.map(item => (
        // eslint-disable-next-line react/jsx-key
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

function DiaryList({ diaryList }) {
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

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
    <div>
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
      {getProcessedDiaryList().map(item => (
        <div key={item.id}>
          {item.content} {item.emotion}
        </div>
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
