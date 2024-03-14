import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { githubLogin, googleLogin, register } from '../../store/user/userThunk';
import { Register } from '../../types';
import { GoogleLogin } from '@react-oauth/google';
import InputFile from '../InputFile/InputFile.tsx';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GITHUB_CLIENT_ID, GITHUB_LOGIN_URL } from '../../constans.ts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Register = () => {
  const { registerLoading, registerError } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search);
  const codeSearch = searchQuery.get('code');
  const [users, setUsers] = useState<Register>({
    username: '',
    password: '',
    displayName: '',
    avatar: null,
  });

  useEffect(() => {
    if (codeSearch) {
      dispatch(githubLogin(codeSearch)).unwrap();
      navigate('/');
    }
  }, [codeSearch, dispatch, navigate]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(users)).unwrap();
      navigate('/');
    } catch (e) {
      // nothing
    }
  };

  const getFieldError = (name: string) => {
    try {
      return registerError?.errors[name].message;
    } catch {
      return undefined;
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setUsers((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onFormSubmit} sx={{ mt: 3 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.log('Login Failed!');
              }}
            />

            <Button
              component={Link}
              to={GITHUB_LOGIN_URL + GITHUB_CLIENT_ID}
              sx={{ color: 'white', background: 'black', width: 400 }}
            >
              <Typography sx={{ marginRight: 3 }}>register via GitHub</Typography>
              <GitHubIcon />
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="new-username"
                  onChange={onChange}
                  value={users.username}
                  error={Boolean(getFieldError('username'))}
                  helperText={getFieldError('username')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="displayName"
                  label="displayName"
                  name="displayName"
                  autoComplete="new-displayName"
                  onChange={onChange}
                  value={users.displayName}
                  error={Boolean(getFieldError('displayName'))}
                  helperText={getFieldError('displayName')}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFile name={'avatar'} image={users.avatar} onChange={onChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChange}
                  value={users.password}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              color={'success'}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!registerLoading}
            >
              {registerLoading ? <CircularProgress /> : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" style={{ color: 'blue' }}>
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
