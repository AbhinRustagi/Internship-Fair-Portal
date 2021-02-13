export const initialState = {
  user: null,
  approved: null,
  companyLimit: 0,
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_APPROVAL":
      return {
        ...state,
        approved: action.approved,
        companyLimit: action.companyLimit,
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn("Cannot remove  product. Not in Cart.");
      }

      return {
        ...state,
        cart: newCart,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
        approved: null,
        companyLimit: 0,
      };
    case "ADD_TO_CART":
      if (state.cart.length === state.companyLimit) {
        return { ...state };
      }
      let thisIndex = state.cart.findIndex(
        (company) => company.id === action.newItem.id
      );

      console.log(thisIndex);

      let newC = [...state.cart];
      if (thisIndex >= 0) {
        newC.splice(thisIndex, 1);
        newC.push(action.newItem);
        return {
          ...state,
          cart: newC,
        };
      }

      return { ...state, cart: [...state.cart, action.newItem] };
    default:
      return state;
  }
};

export default reducer;
