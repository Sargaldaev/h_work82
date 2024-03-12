import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import { ArtistCreate } from '../../../types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { createArtist } from '../../../store/artist/artistThunk.ts';
import InputFile from '../../../components/InputFile/InputFile.tsx';

const ArtistForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { createLoad } = useSelector((state: RootState) => state.artist);
  const { user } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState<ArtistCreate>({
    name: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [dispatch, navigate, user]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createArtist(state)).unwrap();
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
          <Box display={'flex'}>Create Artist</Box>

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
                <TextField
                  label="description"
                  name="description"
                  type="description"
                  autoComplete="new-description"
                  value={state.description}
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

export default ArtistForm;
