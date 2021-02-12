export const initialState = {
  user: null,
  approved: null,
  companyLimit: 0,
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
    default:
      return state;
  }
};

export default reducer;
