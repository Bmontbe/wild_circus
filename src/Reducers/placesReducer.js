const placesReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_PLACES': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default placesReducer;