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
import { RootState } from './app/store.ts';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import ArtistAdmin from './features/adminInterface/ArtistAdmin/ArtistAdmin.tsx';
import AlbumAdmin from './features/adminInterface/AlbumAdmin/AlbumAdmin.tsx';
import TrackAdmin from './features/adminInterface/TrackAdmin/TrackAdmin.tsx';

function App() {
  const { user } = useSelector((state: RootState) => state.user);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppToolbar />
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                user && user.role === 'admin' ? (
                  <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                    <ArtistAdmin />
                  </ProtectedRoute>
                ) : (
                  <Artist />
                )
              }
            />
            <Route
              path="/artist/:id"
              element={
                user && user.role === 'admin' ? (
                  <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                    <AlbumAdmin />
                  </ProtectedRoute>
                ) : (
                  <Album />
                )
              }
            />
            <Route
              path="/albums/:id"
              element={
                user && user.role === 'admin' ? (
                  <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                    <TrackAdmin />
                  </ProtectedRoute>
                ) : (
                  <Track />
                )
              }
            />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            <Route path="/Track_histories" element={<TrackHistory />} />
            <Route path="/addArtist" element={<ArtistForm />} />
            <Route path="/addAlbum" element={<AlbumForm />} />
            <Route path="/addTrack" element={<TrackForm />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
