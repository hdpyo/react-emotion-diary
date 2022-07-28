import { useEffect, useReducer, useRef } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import { DiaryDispatchContext, DiaryStateContext } from './contexts';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function reducer(state, action) {
  let newState = [];

  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter(
        item => parseInt(item.id) !== parseInt(action.data.targetId),
      );
      break;
    }
    case 'EDIT': {
      newState = state.map(item =>
        item.id === action.data.id ? { ...action.data } : item,
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

function App() {
  useEffect(() => {
    const localData = localStorage.getItem('diary');

    if (localData) {
      // id 가 높은 순으로 정렬한다.
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id),
      );

      // 빈 배열일 경우 [0] 인덱스에 접근할 수 없다.
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({
          type: 'INIT',
          data: diaryList,
        });
      }
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(1);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });

    dataId.current += 1;
  };

  // REMOVE
  const onRemove = targetId => {
    dispatch({
      type: 'REMOVE',
      data: {
        targetId,
      },
    });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
