import { 
    SET_PRODUCT,
    SET_ALL_PRODUCTS,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
} from '../actions';

const initialState = {
    profile: null,
    product: null,
    products: null,
    favoriteProducts: JSON.parse(localStorage.getItem('favoriteProducts')) || []
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT: 
            return { 
                ...state, 
                product: action.data
            };
        case SET_ALL_PRODUCTS: 
            return { 
                ...state, 
                products: action.data
            };
        case ADD_TO_FAVORITE:             
            const productsInStorage = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
            const updatedfavoriteProducts = [...productsInStorage, action.data];
            localStorage.setItem('favoriteProducts', JSON.stringify(updatedfavoriteProducts));

            return { 
                ...state, 
                favoriteProducts: updatedfavoriteProducts
            };
        case REMOVE_FROM_FAVORITE:             
            const result = state.favoriteProducts.filter(products => products._id !== action.id);
            localStorage.setItem('favoriteProducts', JSON.stringify(result));
            
            return { 
                ...state, 
                favoriteProducts: result
            };
        default:
            return state;
    }
}