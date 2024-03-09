import React from 'react';
import { Track } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { onPlayYouTube } from '../../../store/track/traksSlice.ts';

interface Props {
  track: Track;
  publ:boolean;
  onTrackHistory: (id: string) => void;
  deleteTrackId: (id: string) => void;
  togglePublished: (id: string) => void;
}

const TrackItemAdmin: React.FC<Props> = ({
  track,
  onTrackHistory,
  deleteTrackId,
  togglePublished,
  publ
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { deleteLoadTrack,publishedTrackLoad } = useSelector((state: RootState) => state.track);


  const dispatch = useDispatch<AppDispatch>();

  const click = () => {
    onTrackHistory(track._id);
    dispatch(onPlayYouTube(track.youTube));
  };
  return (
    <>
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
          {
            !publ ? (
              <>
                <Box sx={{color:'red'}}>
                  Not published
                </Box>
              </>
            ) : null
          }
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
        <Button
          disabled={deleteLoadTrack === track._id}
          onClick={() => deleteTrackId(track._id)}
        >
          {deleteLoadTrack === track._id ? 'Удаление' : 'Удалить'}
        </Button>

        <Button
          disabled={publishedTrackLoad === track._id}
          onClick={() => togglePublished(track._id)}
        >
          {publishedTrackLoad === track._id ? (
            <CircularProgress/>
          ) : track.isPublished ? (
            'unPublish'
          ) : (
            `publish`
          )}
        </Button>
      </Box>
    </>
  );
};

export default TrackItemAdmin;
