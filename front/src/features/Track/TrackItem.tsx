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
        mb: 4,
        borderBottom: '1px solid white',
        padding:'1px'
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

      <Box
        display={'flex'}
      >

        <Typography variant="body1"  sx={{borderRadius: '10px', border:'1px solid white', padding: '5px',marginRight:'5px'}}>
          {track.duration}
        </Typography>
        {user ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: 'green',
              borderRadius: '10px',
              color: 'white',
              padding: '3px'
            }}
            onClick={click}
          >
            Play
          </Button>
        ) : null}
      </Box>

    </Box>
  );
};

export default TracksItem;
