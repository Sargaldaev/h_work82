import { Route, Routes } from 'react-router-dom';
import Artist from './features/Artist/Artist.tsx';
import Album from './features/Album/Album.tsx';
import Track from './features/Track/Track.tsx';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import Register from './components/RegisterForm/RegisterForm.tsx';
import Login from './components/LoginForm/LoginForm.tsx';
import TrackHistory from './features/TrackHistory/TrackHistory.tsx';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <AppToolbar/>
        <Container>
          <Routes>
            <Route path={'/'} element={<Artist/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path="/artist/:id" element={<Album/>}/>
            <Route path="/Track_histories" element={<TrackHistory />} />
            <Route path="/albums/:id" element={<Track/>}/>
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
