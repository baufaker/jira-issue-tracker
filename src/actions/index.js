//action creator (call this funcion to return dispachable actions so you can send these actions to reducers)
export function setIssues (issues) {
    return {
       type: "SET_ISSUES",
       issues: issues
     }
  }
