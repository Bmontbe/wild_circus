
const basketReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_BASKET': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default basketReducer;
