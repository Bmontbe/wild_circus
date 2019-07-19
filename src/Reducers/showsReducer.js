const showsReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_SHOWS': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default showsReducer;