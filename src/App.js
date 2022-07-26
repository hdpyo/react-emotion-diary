import { useReducer, useRef } from 'react';

import { BrowserRouter } from 'react-router-dom';

import './App.css';

import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

import { DiaryDispatchContext, DiaryStateContext } from './contexts';

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

function App() {
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
            <MyHeader
              headText="App"
              leftChild={
                <MyButton text="왼쪽 버튼" onClick={() => alert('왼쪽 클릭')} />
              }
              rightChild={
                <MyButton
                  text="오른쪽 버튼"
                  onClick={() => alert('오른쪽 클릭')}
                />
              }
            />
            <h1>Hello, React!</h1>
            <MyButton
              text="작성완료"
              type="positive"
              onClick={() => console.log('clicked!')}
            />
            <MyButton
              text="삭제"
              type="negative"
              onClick={() => console.log('delete it!')}
            />
            <MyButton
              text="버튼"
              type="default"
              onClick={() => console.log('nothing to do')}
            />
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
