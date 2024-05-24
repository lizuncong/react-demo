import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    console.log('effect======')
  }, [])
  return (
    <div
      className="App"
      onMouseEnter={() => {
        console.log('外部enter')
      }}
      onMouseLeave={() => {
        console.log('外部Leave...')
      }}
    >
      <div
        className="content"
        onMouseEnter={() => {
          console.log('内部enter')
        }}
        onMouseLeave={() => {
          console.log('内部Leave...')
        }}
      >
      </div>
    </div>
  );
}

export default App;
