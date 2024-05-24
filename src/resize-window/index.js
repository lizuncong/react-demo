import { useEffect } from 'react';
import ICON from './Icon';
function App() {

  useEffect(() => {
    console.log('effect======')
  }, [])
  return (
    <div
      className="App"
    >
        <ICON />
    </div>
  );
}

export default App;
