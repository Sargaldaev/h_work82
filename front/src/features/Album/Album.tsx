import { Box, CircularProgress, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchDataAlbum } from '../../store/album/albumThunk.ts';
import { Link, useParams } from 'react-router-dom';

const Album = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const {albums, fetchLoad} = useSelector((state: RootState) => state.album);

  useEffect(() => {
    if (id) {
      dispatch(fetchDataAlbum(id));
    }
  }, [dispatch, id]);
  return (
    <>
      <Box>
        <Button component={Link} to={`/`} size="small">Back</Button>
        {albums.length ? (
          <p>
            <b>Artist: </b>
            {albums[0].artist.name}
          </p>
        ) : null}
        <Box
          display={'flex'}
          sx={{gap: '10px'}}
        >
          {
            fetchLoad ? <CircularProgress/> :
              albums.map(album => {
                return (
                  <Box
                    key={album._id}
                  >
                    <Card
                      sx={{width: 345}}
                    >
                      <CardMedia
                        sx={{height: 240}}
                        image={`http://localhost:8000/${album.image}`} // ToDo написать проверку на то что изобр не будет
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {album.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          {album.releaseYear} years
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/albums/${album._id}`} size="small">Learn More</Button>
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

export default Album;