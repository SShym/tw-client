import './Favorite.css';
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowBack } from '../../images/arrow-back.svg';
import { ReactComponent as BoxSvg } from '../../images/box.svg';
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from '../../redux/actions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import noImage from '../../images/no-image.png';
import { useEffect } from 'react';

const Favorite = () => {
    const favoriteProducts = useSelector(state => state.mainReducer.favoriteProducts);
    const user = useSelector(state => state.authReducer.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/');
    }, [user]) // eslint-disable-line

    const handleRemoveFromFavorite = (id) => dispatch(removeFromFavorite(id))

    return(
        <div className='favorite-wrap'>
            {user &&
                <>
                    <div onClick={() => navigate('/')} className='back-arrow'>
                        <ArrowBack />
                        <span>GO BACK</span>
                    </div>
                    <div>
                        {favoriteProducts?.length > 0 
                            ? <h1 className='favorite-title'>Favorite products:</h1>
                            : <h1 className='favorite-title-no-products'>
                                <BoxSvg className="favorite-box" />
                                <span>You don't have any products in your favorites</span>
                            </h1>
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent:'center', flexWrap: 'wrap', margin:'0px auto', maxWidth:'800px' }}>
                        {favoriteProducts?.map(product => 
                            <Card key={product._id} sx={{ borderRadius:'0px', display: 'flex', m: 1.2, width:'100%', maxWidth: 400 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 200, height: '100%', border:'1px solid gray', borderRight:'none' }}
                                    image={product.imageUrl ? product.imageUrl : noImage}
                                    alt="Favorite product"
                                />
                                <Box sx={{ border:'1px solid gray', width:'100%', display: 'flex', alignItems:'center', justifyContent:'center', textAlign:'center', flexDirection: 'column' }}>
                                    <CardContent>
                                    <Typography sx={{wordBreak:'break-all' }} component="div" variant="h4">
                                        {product.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
                                        <Button onClick={() => handleRemoveFromFavorite(product._id)} variant="outlined" color="error" size="large">
                                            Delete
                                        </Button>
                                    </Box>
                                    </CardContent>
                                </Box>
                            </Card>
                        )}
                    </div>
                </>
            }
        </div>
    )
}

export default Favorite;
