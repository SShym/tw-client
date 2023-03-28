import './Product.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productLoad, addToFavourite, ERROR_DISPLAY_OFF } from '../../redux/actions';
import noImage from '../../images/no-image.png';
import Dialog from '@mui/material/Dialog';
import { ReactComponent as ArrowBack } from '../../images/arrow-back.svg'
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ReactComponent as Message } from '../../images/message.svg';

import Comments from '../Comments/Comments';

const Product = () => {
    const [showFirework, setShowFirework] = useState(false);
    const [showError, setShowError] = useState('');
    const [openComments, setOpenComments] = useState(false);

    const { id } = useParams();
    const [fullscreen, setfullscreenMode] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const product = useSelector(state => state.mainReducer.product);
    const favoriteProducts = useSelector(state => state.mainReducer.favoriteProducts);
    const user = useSelector(state => state.authReducer.user);
    const error = useSelector(state => state.appReducer.error);

    const productsAlreadyInFavorite = favoriteProducts.some(obj => obj._id === product?._id && obj.name === product?.name);

    const handleAddToFavourite = () => {
        if(user){
            if(productsAlreadyInFavorite){
                setShowError('Product already in favorites!');
            } else {
                setShowFirework(true);
                dispatch(addToFavourite(product));
            }
        } else {
            setShowError('Sign in!');
        }
    }

    useEffect(() => {
        dispatch(productLoad(id));
        return () => dispatch({ type: ERROR_DISPLAY_OFF })
    }, []) // eslint-disable-line
    
    useEffect(() => {
        if (showFirework) {
          const timeoutId = setTimeout(() => {
            setShowFirework(false);
          }, 800);
          return () => clearTimeout(timeoutId);
        }
    }, [showFirework]);

    useEffect(() => {
        if (showError) {
          const timeoutId = setTimeout(() => {
            setShowError(false);
          }, 1500);
          return () => clearTimeout(timeoutId);
        }
    }, [showError]);

    return(
        <div className='product-wrap'>
            <div onClick={() => navigate('/')} className='back-arrow'>
                <ArrowBack />
                <span>GO BACK</span>
            </div>
            {(!error && product) && 
                <div className='product box'>
                    <div>
                        <img 
                            onClick={() => product?.imageUrl && setfullscreenMode(true)} 
                            className='product-img' 
                            src={product?.imageUrl ? product.imageUrl : noImage}
                            alt="photoOfproducts" 
                        />
                        <Dialog
                            open={fullscreen}
                            onClose={() => setfullscreenMode(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <img 
                                className='product-fullscreen' 
                                src={product?.imageUrl ? product.imageUrl : product} 
                                alt="fullscreenphoto" 
                            />
                        </Dialog>
                    </div>
                    <div className='product-information'>
                        <h1 className='product-name'>
                            <span>Name:</span> {product?.name}
                        </h1>
                        <span className='product-author'>
                            <span>Count:</span> {product?.count}
                        </span>
                        <span className='product-weight'>
                            <span>Weight:</span> {product?.weight}
                        </span>
                        <button className='product-favorite' onClick={handleAddToFavourite}>
                            <Heart  />
                        </button>
                        {showFirework &&
                            <div class="pyro">
                                <div class="before"></div>
                                <div class="after"></div>
                            </div>
                        }
                        {showError?.length > 0 &&
                            <div className='fade-in-text'>{showError}</div>
                        }
                    </div>
                </div>
            }     
            {(!error && product) &&
                <Comments
                    openComments={openComments}
                    setOpenComments={setOpenComments} 
                    comments={product.comments} 
                />
            }
            <Message onClick={() => setOpenComments(true)} className='comments-button-open'/>
        </div>
    )
}

export default Product;