import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { TrackCreate } from '../../../types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchDataAlbumAll } from '../../../store/album/albumThunk.ts';
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
import CircularProgress from '@mui/material/CircularProgress';
import { createTrack } from '../../../store/track/trackThunk.ts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const TrackForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { createLoad } = useSelector((state: RootState) => state.track);
  const { albumsAll } = useSelector((state: RootState) => state.album);
  const { user } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState<TrackCreate>({
    name: '',
    duration: '',
    album: '',
    youTube: '',
    songNumber: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchDataAlbumAll());
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
      await dispatch(createTrack(state)).unwrap();
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
          <Box display={'flex'}>Create Track</Box>

          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="album-label">Album</InputLabel>
                  <Select
                    labelId="album-label"
                    id="album-select"
                    name="album"
                    value={state.album}
                    onChange={inputChangeHandlerSelect}
                    required
                  >
                    <MenuItem value="" disabled>
                      Choose album
                    </MenuItem>
                    {albumsAll.map((album) => (
                      <MenuItem key={album._id} value={album._id}>
                        {album.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
                <TextField
                  label="song number "
                  name="songNumber"
                  type="text"
                  autoComplete="new-songNumber"
                  value={state.songNumber}
                  onChange={onChange}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="duration "
                  name="duration"
                  type="text"
                  autoComplete="new-duration"
                  value={state.duration}
                  onChange={onChange}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="youTube "
                  name="youTube"
                  type="text"
                  autoComplete="new-youTube"
                  value={state.youTube}
                  onChange={onChange}
                  fullWidth={true}
                />
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

export default TrackForm;
