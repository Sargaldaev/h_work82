import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user?.username}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link to="/Track_histories" style={{ color: 'white', textDecoration: 'none' }}>
            Track histories
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
