const indexResaReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SWITCH':
      return action.payload;
    default:
      return state;
  }
};

export default indexResaReducer;