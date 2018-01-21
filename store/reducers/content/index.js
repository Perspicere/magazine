// import actionTypes from '../../utils/actionTypes'

const actionTypes = {
  INITIALIZE: 'INITIALIZE'
}

const defaultState = {
  fetching: false,
  error: false
}

export default function content(state = defaultState, action) {
  switch (action.type) {
    case `${actionTypes.INITIALIZE}_FULFILLED`:
      return {
        ...state,
        ...action.payload,
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
