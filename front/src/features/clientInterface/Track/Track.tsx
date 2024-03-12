import { Box, CircularProgress, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { useEffect } from 'react';
import { deleteTrack, fetchDataTrack } from '../../../store/track/trackThunk.ts';
import { fetchDataAlbumInfo } from '../../../store/album/albumThunk.ts';
import Button from '@mui/material/Button';
import { historyTrackPost } from '../../../store/trackHistory/trackHistoryThunk.ts';
import TracksItem from './TrackItem.tsx';

const Track = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const { albumsInfo } = useSelector((state: RootState) => state.album);
  const { tracks, fetchLoadTrack } = useSelector((state: RootState) => state.track);
  const { user } = useSelector((state: RootState) => state.user);
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

  const deleteTrackId = async (Id: string) => {
    await dispatch(deleteTrack(Id));
    await dispatch(fetchDataTrack(id));
  };
  return (
    <>
      <Box>
        <Button component={Link} to={`/artist/${albumsInfo?.artist._id}`} size="small">
          Back
        </Button>

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

        <Box>
          {fetchLoadTrack ? (
            <CircularProgress />
          ) : (
            tracks.map((track) =>
              track.isPublished || user?._id === track.user ? (
                user?._id === track.user && !track.isPublished ? (
                  <TracksItem
                    key={track._id}
                    deleteTrackId={() => deleteTrackId(track._id)}
                    track={track}
                    publ={track.isPublished}
                    onTrackHistory={() => onTrackHistory(track._id)}
                  />
                ) : (
                  <TracksItem
                    key={track._id}
                    track={track}
                    publ={track.isPublished}
                    deleteTrackId={() => deleteTrackId(track._id)}
                    onTrackHistory={() => onTrackHistory(track._id)}
                  />
                )
              ) : null,
            )
          )}
        </Box>
      </Box>
    </>
  );
};

export default Track;
