import { useState } from 'react';

const sortOptionList = [
  { id: '1', value: 'latest', name: '최신순' },
  { id: '2', value: 'oldest', name: '오래된 순' },
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

  const getProcessedDiaryList = () => {
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
    return copyList.sort(compare);
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
