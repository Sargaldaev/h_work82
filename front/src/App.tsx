import { Route, Routes } from 'react-router-dom';
import Artist from './features/Artist/Artist.tsx';
import Album from './features/Album/Album.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Artist/>}/>
        <Route path="/artist/:id" element={<Album/>}/>
      </Routes>
    </>
  );
}

export default App;
