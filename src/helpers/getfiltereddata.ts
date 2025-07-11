interface Issue{
    _id:string,
    status:string,
    duedate:Date,
    priority:string
}
interface IssueRequest{
    status:string,
}
export function getFilteredIssues(issues: Issue[]){
    const overdueStatus = ["Reopened" , "Open" , "Assigned"];
    const issueStatus = ["Assigned" , "Review"];
    const totalIssues = issues.length;
    const completedIssues = issues.filter((issue)=>(issue.status === "Closed")).length;
    const onWorkingIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
    const issueInReview = issues.filter((issue)=>(issue.status === "Review")).length;
    const reopenedIssues = issues.filter((issue)=>(issue.status === "Reopened")).length;
    const completionRate = totalIssues ? Math.round((completedIssues / totalIssues) * 100) : 0;
    const overdueIssues = issues.filter((issue)=>((overdueStatus.includes(issue.status)) && new Date() > new Date(issue.duedate))).length;
    const overdueRate = totalIssues ? Math.round((overdueIssues / totalIssues) * 100) : 0;
    const highPriorityIssues = issues.filter((issue)=>(issue.priority === "High")).length;
    const mediumPriorityIssues = issues.filter((issue)=>(issue.priority === "Medium")).length;
    const lowPriorityIssues = issues.filter((issue)=>(issue.priority === "Low")).length;
    return { totalIssues , completedIssues , onWorkingIssues , issueInReview , overdueIssues ,
        reopenedIssues , completionRate , overdueRate , highPriorityIssues , mediumPriorityIssues , lowPriorityIssues};
}
export function getFilteredRequestedIssues(requestedIssues: IssueRequest[]){
    const totalrequestedIssues = requestedIssues.length;
    const pendingRequestIssues = requestedIssues.filter((issue)=>(issue.status === "Pending")).length;
    const approvedRequestIssues = requestedIssues.filter((issue)=>(issue.status === "Approved")).length;
    const rejectedRequestIssues = requestedIssues.filter((issue)=>(issue.status === "Rejected")).length;
    const requestIssueAcceptanceRate = totalrequestedIssues ? (approvedRequestIssues / totalrequestedIssues) * 100 : 0;
    const requestIssueRejectionRate = totalrequestedIssues ? (rejectedRequestIssues / totalrequestedIssues) * 100 : 0;
    return { pendingRequestIssues , approvedRequestIssues , rejectedRequestIssues , requestIssueAcceptanceRate , 
        requestIssueRejectionRate };
}