export default (state, action) => {
    switch (action.type) {
        case "SET_ISSUES":
           return Object.assign({}, state, {
               issues: action.issues
           });
        case "CLEAR_ISSUES":
            //do something
            return;
       default:
           return state;
            }
}