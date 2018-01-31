export default (contentName, defaultState = { fetching: false, error: false }) => {
  return (state = defaultState, action) => {
    switch (action.type) {
      case `${contentName}_FULFILLED`:
        return {
          ...state,
          ...action.payload,
          error: false,
          fetching: false
        }
      case `${contentName}_REJECTED`:
        return {
          ...state,
          error: action.payload,
          fetching: false
        }
      case `${contentName}_PENDING`:
        return {
          ...state,
          error: false,
          fetching: true
        }
      default:
        return state
    }
  }
}
