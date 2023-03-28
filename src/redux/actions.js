import axios from 'axios';
export const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON';
export const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF';
export const LOADER_DISPLAY_ON = 'LOADER_DISPLAY_ON';
export const LOADER_DISPLAY_OFF = 'LOADER_DISPLAY_OFF';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_ALL_PRODUCTS = 'SET_ALL_PROFILES';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';

const API = axios.create({ 
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://tw-server.cyclic.app'
});

export function errorOn(text){
  return dispatch => {
      dispatch({ type: ERROR_DISPLAY_ON, text });
  }
}

export function loaderOn(){
  return{
      type: LOADER_DISPLAY_ON,
  }
}

export function loaderOff(){
  return{
      type: LOADER_DISPLAY_OFF,
  }
}

export const auth = (formData) => (dispatch) => {
    try {
      dispatch({ type: AUTH, data: formData });
    } catch (error) {
      dispatch(errorOn(error.response.status));
    }
};


export const productCreate = (values, setOpen) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await API.post('/product/create', values, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).finally(() => {
      dispatch(productsLoad());
      setOpen(false);
      dispatch(loaderOff());
    })
  } catch (error) {
    dispatch(errorOn(error.response.status));
  }
};

export const productsLoad = () => async (dispatch) => {
  dispatch({ type: SET_PRODUCT, data: null});
  try {
    await API.get('/products').then((res) => {      
      dispatch({ type: SET_ALL_PRODUCTS, data: res.data});
    })
  } catch (error) {
    dispatch(errorOn(error.response.status));
  }
};

export const productLoad = (id) => async (dispatch) => {
  try {
    await API.get(`/product/${id}`).then((res) => {
      dispatch({ type: SET_PRODUCT, data: res.data});
    })
  } catch (error) {
    dispatch(errorOn(error.response.status));
  }
};

export const productDelete = (id) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await API.delete(`/product/delete/${id}`).then(() => {
      dispatch(productsLoad());
    }).finally(() => {
      dispatch(loaderOff());
    })
  } catch (error) {
    dispatch(errorOn(error.response.status));
  }
};

export const productEdit = (id, formData, setOpen) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await API.put(`/product/edit/${id}`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).finally(() => {
      dispatch(productsLoad());
      setOpen(false);
      dispatch(loaderOff());
    })
  } catch (error) {
    dispatch(loaderOff());
    dispatch(errorOn(error.response.status));
  }
};


export const addCommentToProduct = (formData, setText) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await API.post(`/product/create-comment`, formData).then(() => {
      dispatch(productLoad(formData.productId));
    }).finally(() => {
      dispatch(loaderOff());
      setText('')
    })
  } catch (error) {
    dispatch(loaderOff());
    dispatch(errorOn(error.response.status));
  }
};

export const addToFavourite = (product) => (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE, data: product });
};

export const removeFromFavorite = (id) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_FAVORITE, id });
};




