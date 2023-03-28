import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from 'react-google-login';
import { ReactComponent as GoogleIcon } from '../../images/google-icon.svg';
import { ReactComponent as Heart } from '../../images/heart.svg';
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from '../../redux/actions';
import { LOGOUT } from '../../redux/actions';
import { useEffect } from "react";
import { gapi } from 'gapi-script';

const Navbar = () => {
    useEffect(() => {
        gapi.load('client:auth2', ()=>{
          gapi.client.init({
            clientId: '266321924299-q2h7jdnf3efrad4ben4vs6vm6m3pi35h.apps.googleusercontent.com',
            scope: 'email',
          });
        });
    }, []);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const products = useSelector(state => state.mainReducer.products);
    const user = useSelector(state => state.authReducer.user);
    const favoriteProducts = useSelector(state => state.mainReducer.favoriteProducts);

    const googleSuccess = async (res) => {        
        try {
          dispatch(auth(res.profileObj));
        } catch (error) {
          console.log(error);
        }
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
    }

    return(
        <div>
            {(location.pathname !== '/' || products) &&
                <div className='login-button-wrap'>
                    {user ?
                        <div className='profile-block-wrap'>
                            <div className='logout-block'>
                                <button onClick={logout} type="submit">
                                    Logout
                                </button>
                            </div>
                            <div className='profile-block-user'>
                                <div className='profile-block'>
                                    <img alt="useravatar" src={user ? user.imageUrl : user.imageUrl} />
                                    <h1>{user ? user.name : user.name}</h1>
                                </div>
                                <div className='profile-block-favorite' onClick={() => navigate('/favorite')}>
                                    <Heart className='main-favorite' />
                                    {favoriteProducts?.length > 0 &&
                                        <div className='favorite-products'>
                                            <span>{favoriteProducts?.length}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        :  <div className='login-button'>
                            <GoogleLogin className='login-button'
                                    clientId="266321924299-q2h7jdnf3efrad4ben4vs6vm6m3pi35h.apps.googleusercontent.com"
                                    render={(renderProps) => (
                                        renderProps.disabled ? 
                                        <button type="submit" >
                                            <GoogleIcon className='google-icon' />
                                            Google Sign In
                                        </button>
                                        : <button onClick={renderProps.onClick} disabled={renderProps.disabled} type="submit">
                                            <GoogleIcon className='google-icon' />
                                            Google Sign In
                                        </button>
                                    )}
                                    onSuccess={googleSuccess}
                                    cookiePolicy="single_host_origin"
                            />   
                        </div>      
                    }
                </div> 
            }
        </div>
    )
}

export default Navbar;