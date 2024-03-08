import { Route, Routes } from 'react-router-dom';
import Artist from './features/clientInterface/Artist/Artist.tsx';
import Album from './features/clientInterface/Album/Album.tsx';
import Track from './features/clientInterface/Track/Track.tsx';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import Register from './components/RegisterForm/RegisterForm.tsx';
import Login from './components/LoginForm/LoginForm.tsx';
import TrackHistory from './features/clientInterface/TrackHistory/TrackHistory.tsx';
import ArtistForm from './features/clientInterface/ArtistForm/ArtistForm.tsx';
import AlbumForm from './features/clientInterface/AlbumForm/AlbumForm.tsx';
import TrackForm from './features/clientInterface/TrackForm/TrackForm.tsx';

function App() {
  // const {user} = useSelector((state: RootState) => state.user);

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
            <Route path="/Track_histories" element={<TrackHistory/>}/>
            <Route path="/albums/:id" element={<Track/>}/>
            <Route path="/addArtist" element={<ArtistForm/>}/>
            <Route path="/addAlbum" element={<AlbumForm/>}/>
            <Route path="/addTrack" element={<TrackForm/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}


export default App;
