import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteTrack, fetchDataTrack, publishedTrack } from '../../../store/track/trackThunk';
import { fetchDataAlbumInfo } from '../../../store/album/albumThunk';
import { historyTrackPost } from '../../../store/trackHistory/trackHistoryThunk.ts';
import { Box, CircularProgress } from '@mui/material';
import TrackItemAdmin from './TrackItemAdmin.tsx';
import Button from '@mui/material/Button';

const TrackAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams() as { id: string };
  const { tracks, fetchLoadTrack } = useSelector((state: RootState) => state.track);
  const { albumsInfo } = useSelector((state: RootState) => state.album);
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

  const onTrackHistory = (id: string) => {
    dispatch(historyTrackPost(id));
  };

  const deleteTracktId = async (Id: string) => {
    await dispatch(deleteTrack(Id));
    await dispatch(fetchDataTrack(id));
  };
  const togglePublishedTrack = async (Id: string) => {
    await dispatch(publishedTrack(Id));
    await dispatch(fetchDataTrack(id));
  };
  return (
    <Box>
      <Button component={Link} to={`/artist/${albumsInfo?.artist._id}`} size="small">
        Back
      </Button>

      {albumsInfo ? (
        <Box>
          <span>
            <b>Album: </b>
            {albumsInfo.name}
          </span>
          <p>
            <b>Artist: </b>
            {albumsInfo.artist.name}
          </p>
        </Box>
      ) : null}
      {fetchLoadTrack ? (
        <CircularProgress />
      ) : (
        tracks.map((track) => (
          <TrackItemAdmin
            key={track._id}
            track={track}
            publ={track.isPublished}
            onTrackHistory={() => onTrackHistory(track._id)}
            deleteTrackId={() => deleteTracktId(track._id)}
            togglePublished={() => togglePublishedTrack(track._id)}
          />
        ))
      )}
    </Box>
  );
};

export default TrackAdmin;
