
const basketReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_BASKET': {
      const newStateBasket = { ...state };
      newStateBasket = action.payload;
      return newStateBasket;
    }
    default:
      return state;
  }
};

export default basketReducer;
