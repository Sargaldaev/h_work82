import { Box, CircularProgress, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchDataTrack } from '../../store/track/trackThunk.ts';
import { fetchDataAlbumInfo } from '../../store/album/albumThunk.ts';
import Button from '@mui/material/Button';
import { historyTrackPost } from '../../store/trackHistory/trackHistoryThunk.ts';
import TracksItem from './TrackItem.tsx';

const Track = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const {albumsInfo} = useSelector((state: RootState) => state.album);
  const {tracks, fetchLoadTrack} = useSelector((state: RootState) => state.track);
  const {user} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {

    if (!user) {
      navigate('/login');
    }
    if (id) {
      dispatch(fetchDataTrack(id));
      dispatch(fetchDataAlbumInfo(id));
    }
  }, [dispatch, id, navigate, user]);

  const onTrackHistory = async (id: string) => {
    dispatch(historyTrackPost(id));
  };

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
          {fetchLoadTrack ? (
            <CircularProgress/>
          ) : (
            tracks.map((track) =>
              <TracksItem
                key={track._id}
                track={track}
                onTrackHistory={() => onTrackHistory(track._id)}
              />
            )
          )}
        </Box>

      </Box>
    </>
  );
};

export default Track;