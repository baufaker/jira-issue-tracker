export default (state, action) => {
    switch (action.type) {
        case "SET_ISSUES":
           return Object.assign({}, state, {
               issues: action.issues
           });
           return;
       case "CLEAR_ISSUES":
            //do something
           break;
       default:
           return state;
            }
}