// import actionTypes from '../../utils/actionTypes'

const actionTypes = {
  INITIALIZE: 'INITIALIZE'
}

const defaultState = {
  content: {
    loading: true,
    error: false
  }
}

export default function content(state = defaultState, action) {
  console.log({action})
  switch (action.type) {
    case `${actionTypes.INITIALIZE}_FULFILLED`:
      return {
        ...state,
        content: {
          ...action.payload,
          error: false,
          loading: false
        }
      }
    case `${actionTypes.INITIALIZE}_REJECTED`:
      return {
        ...state,
        content: {
          error: true,
          loading: false
        }
      }
    case `${actionTypes.INITIALIZE}_PENDING`:
      return {
        ...state,
        content: {
          error: false,
          loading: true
        }
      }
    default:
      return state
  }
}
