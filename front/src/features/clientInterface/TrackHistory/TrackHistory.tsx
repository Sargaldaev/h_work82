import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { historyTrackData } from '../../../store/trackHistory/trackHistoryThunk.ts';
import { AppDispatch, RootState } from '../../../app/store.ts';
import dayjs from 'dayjs';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';


const TrackHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {trackHistory} = useSelector((state: RootState) => state.trackHistory);
  const {user} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

      dispatch(historyTrackData());

  }, [dispatch, navigate, trackHistory.length, user]);

  return (
    <>
      <Button component={Link} to={`/`} size="small">Back</Button>
      {!trackHistory.length ? (
        <Typography variant="h6" align="center" className="text-white fw-bold">
          Your story list is empty
        </Typography>
      ) : (
        <Grid>

          {
            trackHistory.map((track) => (
            <Grid
              display={'flex'}
              key={track._id}
              sx=
                {{justifyContent:'space-around',
                borderBottom:'2px solid white',
                marginBottom:'10px',
            }}
            >
              <Typography >
                {track.track.album.artist.name}
              </Typography>
              <Typography >
                {track.track.name}
              </Typography>
              <Typography>
                {dayjs(track.datetime).format('HH:mm:ss DD.MM.YYYY')}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default TrackHistory;
