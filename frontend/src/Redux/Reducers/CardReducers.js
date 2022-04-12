import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/CartConstant";

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product); //find same product in cartItems

            if (existItem) {
                // if existItem return
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
                    // tạo một bản sao state của mảng hiện tại, kiểm tra  phần tử nào trong mảng có trùng id với phần tử có payload action
                    // thì trả về item còn không thì giữ nguyên, kiểm tra độ chắc chắn trong trường hợp values countInstock trong mảng thay đổi
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    // trả lại mảng mới có thêm item
                }
            };
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state;
    }
}