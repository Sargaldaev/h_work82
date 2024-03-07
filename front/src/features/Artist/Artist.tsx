import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchData } from '../../store/artist/artistThunk.ts';
import { Link } from 'react-router-dom';

const Artist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {artists, fetchLoad} = useSelector((state: RootState) => state.artist);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      <Box>

        <Box
          display={'flex'}
          sx={{gap: '10px'}}
        >
          {
            fetchLoad ? <CircularProgress/> :
              artists.map(artist => {
                return (
                  <Box
                    key={artist._id}
                  >
                    <Card
                      sx={{width: 345}}
                    >

                      {artist.image ? (
                        <CardMedia
                          sx={{height: 350}}
                          image={`http://localhost:8000/${artist.image}`}
                        />
                      ) : (
                        <CardMedia
                          sx={{height: 350}}
                          image={'img'}
                        />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {artist.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/artist/${artist._id}`} size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </Box>
                );
              })
          }
        </Box>

      </Box>
    </>
  );
};

export default Artist;
