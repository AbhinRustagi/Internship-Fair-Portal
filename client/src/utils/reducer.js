export const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    // case "ADD_INFO":
    //   return {
    //     ...state,
    //     info: action.info,
    //   };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
        info: null,
      };
    default:
      return state;
  }
};

export default reducer;
