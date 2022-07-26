import './App.css';

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <div className="App">
      <h1>Hello, React!</h1>
      {/* process.env.PUBLIC_URL : public 폴더를 가리킴 */}
      <img src={env.PUBLIC_URL + `/assets/emotion1.png`} alt="emotion1" />
      <img src={env.PUBLIC_URL + `/assets/emotion2.png`} alt="emotion2" />
      <img src={env.PUBLIC_URL + `/assets/emotion3.png`} alt="emotion3" />
      <img src={env.PUBLIC_URL + `/assets/emotion4.png`} alt="emotion4" />
      <img src={env.PUBLIC_URL + `/assets/emotion5.png`} alt="emotion5" />
    </div>
  );
}

export default App;
