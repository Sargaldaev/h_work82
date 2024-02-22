import { Box, CircularProgress, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchDataTrack } from '../../store/track/trackThunk.ts';
import { fetchDataAlbumInfo } from '../../store/album/albumThunk.ts';
import Button from '@mui/material/Button';

const Track = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const {albumsInfo} = useSelector((state: RootState) => state.album);
  const {tracks, fetchLoadTrack} = useSelector((state: RootState) => state.track);

  useEffect(() => {

    if (id) {
      dispatch(fetchDataTrack(id));
      dispatch(fetchDataAlbumInfo(id));
    }
  }, [dispatch, id]);
  return (
    <>
      <Box>
        <Button component={Link} to={`/artist/${albumsInfo?.artist._id}`} size="small">Back</Button>

        {albumsInfo ? (
          <Box
            sx={{
              textAlign: 'center',
              mt: 3,
              color: 'text.primary',
            }}
          >
            <Typography variant="h6">
              <b>Album:</b> {albumsInfo.name}
            </Typography>
            <Typography variant="body1">
              <b>Artist:</b> {albumsInfo.artist.name}
            </Typography>
          </Box>
        ) : null}

        <Box
        >
          {
            fetchLoadTrack ? <CircularProgress/> :
              tracks.map(track => {
                return (
                  <Box
                    key={track._id}
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

                    <Typography
                      variant="body1"
                      sx={{bgcolor: 'green', padding: '4px', borderRadius: '10px', fontWeight: 'bold'}}>
                      {track.duration}
                    </Typography>

                  </Box>
                );
              })
          }
        </Box>

      </Box>
    </>
  );
};

export default Track;