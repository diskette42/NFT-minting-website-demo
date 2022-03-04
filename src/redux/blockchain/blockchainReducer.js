const initialState = {
  loading: false,
  account: '',
  isWhitelisted: false,
  smartContract: null,
  web3: null,
  errorMsg: '',
}

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_WHITELISTED_ADDRESS':
      return {
        ...initialState,
        isWhitelisted: action.payload,
      }
    case 'CONNECTION_REQUEST':
      return {
        ...initialState,
        loading: true,
      }
    case 'CONNECTION_SUCCESS':
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
      }
    case 'CONNECTION_FAILED':
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      }
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload.account,
      }
    default:
      return state
  }
}

export default blockchainReducer
