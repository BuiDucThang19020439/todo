export const addItemReducer = (state = false, action) => {
    switch (action.type) {
        case "Toggle" :
            return !state;
        default:
            return state;
    }
};

export default addItemReducer;