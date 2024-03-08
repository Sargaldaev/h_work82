import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import YouTube from '../Youtube/Youtube.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { onClose } from '../../store/track/traksSlice.ts';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { logout } from '../../store/user/userThunk';


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const {urlYoutube} = useSelector((state: RootState) => state.track);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user?.username}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link to="/Track_histories" style={{color: 'white', textDecoration: 'none'}}>
            Track histories
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/addArtist" style={{color: 'white', textDecoration: 'none'}}>
            Add artist
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/addAlbum" style={{color: 'white', textDecoration: 'none'}}>
            Add album
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/addTrack" style={{color: 'white', textDecoration: 'none'}}>
            Add track
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {urlYoutube && (
        <Box
          sx={{
            position: 'fixed',
            top: 200,
            right: 350,
          }}
        >
          <Button
            onClick={() => dispatch(onClose())}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'transparent',
              border: 'none',
              color: '#fff',
            }}
          >
            <Box
              sx={
                {
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  background: 'maroon',
                  width: '24px',
                  height: '24px'
                }
              }
            >
              <CloseSharpIcon/>
            </Box>
          </Button>
          <YouTube autoPlay src={urlYoutube}/>
        </Box>
      )}
    </>
  );
};

export default UserMenu;
