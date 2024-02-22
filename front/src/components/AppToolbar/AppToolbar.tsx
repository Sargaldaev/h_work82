import { Link as NavLink } from 'react-router-dom';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Music</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppToolbar;
