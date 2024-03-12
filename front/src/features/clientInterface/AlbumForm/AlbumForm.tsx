import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AlbumCreate } from '../../../types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchData } from '../../../store/artist/artistThunk.ts';
import { createAlbum } from '../../../store/album/albumThunk.ts';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import InputFile from '../../../components/InputFile/InputFile.tsx';
import CircularProgress from '@mui/material/CircularProgress';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AlbumForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { createLoad } = useSelector((state: RootState) => state.album);
  const { user } = useSelector((state: RootState) => state.user);
  const { artists } = useSelector((state: RootState) => state.artist);

  const [state, setState] = useState<AlbumCreate>({
    name: '',
    releaseYear: '',
    artist: '',
    image: null,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchData());
  }, [dispatch, user, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const inputChangeHandlerSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createAlbum(state)).unwrap();
      navigate('/');
    } catch (e) {
      // nothing
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Button
          component={Link}
          to={`/`}
          sx={{ position: 'absolute', top: 130, left: 555 }}
          size="small"
        >
          Main
        </Button>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box display={'flex'}>Create Album</Box>

          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="name"
                  name="name"
                  autoComplete="new-name"
                  value={state.name}
                  onChange={onChange}
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="artist-label">Artist</InputLabel>
                  <Select
                    labelId="artist-label"
                    id="artist-select"
                    name="artist"
                    value={state.artist}
                    onChange={inputChangeHandlerSelect}
                    required
                  >
                    <MenuItem value="" disabled>
                      Choose artist
                    </MenuItem>
                    {artists.map((artist) => (
                      <MenuItem key={artist._id} value={artist._id}>
                        {artist.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="release Year"
                  name="releaseYear"
                  type="text"
                  autoComplete="new-releaseYear"
                  value={state.releaseYear}
                  onChange={onChange}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFile name={'image'} image={state.image} onChange={onChange} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color={'success'}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!createLoad}
            >
              {createLoad ? <CircularProgress /> : 'Create'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AlbumForm;
