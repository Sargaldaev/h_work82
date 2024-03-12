import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { useEffect } from 'react';
import { deleteArtist, fetchData } from '../../../store/artist/artistThunk.ts';
import { Link } from 'react-router-dom';

const Artist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { artists, fetchLoad, deleteLoad } = useSelector((state: RootState) => state.artist);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteArtistId = async (id: string) => {
    await dispatch(deleteArtist(id));
    await dispatch(fetchData());
  };
  return (
    <>
      <Box>
        <Box display={'flex'} flexWrap={'wrap'} sx={{ gap: '10px' }}>
          {fetchLoad ? (
            <CircularProgress />
          ) : (
            artists.map((artist) => {
              return artist.isPublished || user?._id === artist.user ? (
                user?._id === artist.user && !artist.isPublished ? (
                  <Box key={artist._id} position={'relative'}>
                    <Box sx={{ position: 'absolute', top: 0, color: 'red' }}>Not published</Box>
                    <Card sx={{ width: 345 }}>
                      {artist.image ? (
                        <CardMedia
                          sx={{ height: 350 }}
                          image={`http://localhost:8000/${artist.image}`}
                        />
                      ) : (
                        <CardMedia sx={{ height: 350 }} image={'img'} />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {artist.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/artist/${artist._id}`} size="small">
                          Learn More
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteLoad === artist._id}
                          onClick={() => deleteArtistId(artist._id)}
                        >
                          {deleteLoad === artist._id ? <CircularProgress /> : 'Delete'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                ) : (
                  <Box key={artist._id}>
                    <Card sx={{ width: 345 }}>
                      {artist.image ? (
                        <CardMedia
                          sx={{ height: 350 }}
                          image={`http://localhost:8000/${artist.image}`}
                        />
                      ) : (
                        <CardMedia sx={{ height: 350 }} image={'img'} />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {artist.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/artist/${artist._id}`} size="small">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                )
              ) : null;
            })
          )}
        </Box>
      </Box>
    </>
  );
};

export default Artist;
