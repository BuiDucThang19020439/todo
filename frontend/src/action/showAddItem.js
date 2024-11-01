export const toggle = (isAddTodoItem) => {
    return {
        type: "TOGGLE",
        payload: isAddTodoItem,
    }
}