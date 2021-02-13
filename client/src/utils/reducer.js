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
      return { ...state, cart: [...state.cart, action.newItem] };
    default:
      return state;
  }
};

export default reducer;
