import './App.css';
import MyButton from './components/MyButton';

function App() {
  return (
    <div className="App">
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
