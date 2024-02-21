import { Route, Routes } from 'react-router-dom';
import Artist from './features/Artist/Artist.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Artist/>}/>
      </Routes>
    </>
  );
}

export default App;
