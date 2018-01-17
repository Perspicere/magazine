// import actionTypes from '../../utils/actionTypes'

const actionTypes = {
  INITIALIZE: 'INITIALIZE'
}

const defaultState = {
  fetching: false,
  error: false
}

export default function issues(state = defaultState, action) {
  switch (action.type) {
    case `${actionTypes.INITIALIZE}_FULFILLED`:
      return {
        ...state,
        currentIssue: action.payload[0],
        [action.payload[0]]: action.payload[1],
        error: false,
        fetching: false
      }
    case `${actionTypes.INITIALIZE}_REJECTED`:
      return {
        ...state,
        error: action.payload,
        fetching: false
      }
    case `${actionTypes.INITIALIZE}_PENDING`:
      return {
        ...state,
        error: false,
        fetching: true
      }
    default:
      return state
  }
}
