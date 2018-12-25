const ReducerDefaultState = [];

export default (state = ReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ];
    case 'SET_POSTS':
      return action.posts;
    default:
      return state;
  }
};
