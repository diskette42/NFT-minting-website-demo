const initialState ={
    createdImage: ''
}

const createImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_IMAGE':
            return {
                ...state,
                createdImage: action.payload,
            };
        default:
            return state;
    }
}

export default createImageReducer;