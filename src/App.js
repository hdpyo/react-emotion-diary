import { useReducer, useRef } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import { DiaryDispatchContext, DiaryStateContext } from './contexts';

import Home from './pages/Home';
import New from './pages/New';

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
      newState = state.filter(item => item.id !== action.targetId);
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
  return newState;
}

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    date: 1638969241915,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date: 1658829141016,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    date: 1658829153805,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

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
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
