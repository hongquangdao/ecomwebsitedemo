import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_DETAILS_SUCCESS,
    PRODUCT_LIST_DETAILS_FAIL,
    PRODUCT_LIST_DETAILS_REQUEST
} from "../Constants/ProductConstant";

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state,loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

//SINGLE PRODUCT
export const productDetailsReducer = (state = { product: {reviews: []} }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_DETAILS_REQUEST:
            return { ...state, loading: true, product: [] };
        case PRODUCT_LIST_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_LIST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}