import React from 'react';
import { Typography } from '@mui/material';
import { User } from '../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Typography color="inherit">
        Hello, {user?.username}
      </Typography>
    </>
  );
};

export default UserMenu;
