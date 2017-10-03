const initialState = {
  title: '',
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'HEADER_TITLE':
      return {
        ...state,
        title: payload.title,
      }

    default:
      return state
  }
}
