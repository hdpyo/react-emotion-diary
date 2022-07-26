import './App.css';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  return (
    <div className="App">
      <MyHeader
        headText="App"
        leftChild={
          <MyButton text="왼쪽 버튼" onClick={() => alert('왼쪽 클릭')} />
        }
        rightChild={
          <MyButton text="오른쪽 버튼" onClick={() => alert('오른쪽 클릭')} />
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
  );
}

export default App;
