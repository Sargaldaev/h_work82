import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { Track } from '../../types';
import { AppDispatch, RootState } from '../../app/store.ts';
import { onPlayYouTube } from '../../store/track/traksSlice.ts';

interface Props {
  track: Track;
  onTrackHistory: (id: string) => void;
}

const TracksItem: React.FC<Props> = ({track, onTrackHistory}) => {
  const {user} = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const click = () => {
    onTrackHistory(track._id);
    dispatch(onPlayYouTube(track.youTube));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'text.primary',
        mb: 1,
        borderBottom: '1px solid white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '35px',
        }}
      >
        <Typography variant="body1" fontWeight="bold" sx={{ms: 2}}>
          {track.songNumber}
        </Typography>

        <Typography variant="body1" fontWeight="bold">
          {track.name}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{bgcolor: 'primary.main'}}>
        {track.duration}
      </Typography>

      {user ? (
        <Button variant="contained" color="primary" onClick={click}>
          Play
        </Button>
      ) : null}
    </Box>
  );
};

export default TracksItem;
