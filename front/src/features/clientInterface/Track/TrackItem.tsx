import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { Track } from '../../../types';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { onPlayYouTube } from '../../../store/track/traksSlice.ts';

interface Props {
  track: Track;
  publ: boolean;
  deleteTrackId: (id: string) => void;
  onTrackHistory: (id: string) => void;
}

const TracksItem: React.FC<Props> = ({ track, onTrackHistory, publ, deleteTrackId }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { deleteLoadTrack } = useSelector((state: RootState) => state.track);

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
        padding: '1px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '35px',
        }}
      >
        {!publ ? (
          <>
            <Box sx={{ color: 'red' }}>Not published</Box>
          </>
        ) : null}
        <Typography variant="body1" fontWeight="bold" sx={{ ms: 2 }}>
          {track.songNumber}
        </Typography>

        <Typography variant="body1" fontWeight="bold">
          {track.name}
        </Typography>
      </Box>

      <Box display={'flex'}>
        <Typography
          variant="body1"
          sx={{
            borderRadius: '10px',
            border: '1px solid white',
            padding: '5px',
            marginRight: '5px',
          }}
        >
          {track.duration}
        </Typography>
        {user ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: 'green',
              borderRadius: '10px',
              color: 'white',
              padding: '3px',
            }}
            onClick={click}
          >
            Play
          </Button>
        ) : null}
      </Box>
      {user?._id === track.user && !track.isPublished ? (
        <Button
          disabled={deleteLoadTrack === track._id}
          onClick={() => deleteTrackId(track._id)}
          sx={{ position: 'absolute', right: 320, color: 'red' }}
        >
          {deleteLoadTrack === track._id ? 'load' : 'delete'}
        </Button>
      ) : null}
    </Box>
  );
};

export default TracksItem;
