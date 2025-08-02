import Constants from "@/constents/constants";
import { Types } from "mongoose";

interface Issue{
    _id:string,
    status:string,
    duedate:Date,
    priority:string,
    assignedTo:Types.ObjectId
}
interface IssueRequest{
    status:string,
    actionTakenAt:Date,
    createdAt:Date,
}
interface IssueReview{
    status:string,
    reviewedAt:Date,
    createdAt:Date,
}
export function getFilteredIssues(issues: Issue[]){
    const overdueStatus = ["Reopened" , "Open" , "Assigned"];
    const issueStatus = ["Assigned" , "Review"];
    const totalIssues = issues.length;
    const completedIssues = issues.filter((issue)=>(issue.status === Constants.Closed)).length;
    const assignedIssues = issues.filter((issue)=>(issue.status === Constants.Assigned)).length;
    const unAssignedIssues = issues.filter((issue)=>(!issue.assignedTo)).length;
    const onWorkingIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
    const issueInReview = issues.filter((issue)=>(issue.status === Constants.Review)).length;
    const reopenedIssues = issues.filter((issue)=>(issue.status === Constants.Reopened)).length;
    const completionRate = totalIssues ? Math.round((completedIssues / totalIssues) * 100) : 0;
    const activityRate = totalIssues ? Math.round((onWorkingIssues / totalIssues) * 100) : 0;
    const overdueIssues = issues.filter((issue)=>((overdueStatus.includes(issue.status)) && new Date() > new Date(issue.duedate))).length;
    const overdueRate = totalIssues ? Math.round((overdueIssues / totalIssues) * 100) : 0;
    const highPriorityIssues = issues.filter((issue)=>(issue.priority === Constants.High)).length;
    const mediumPriorityIssues = issues.filter((issue)=>(issue.priority === Constants.Medium)).length;
    const lowPriorityIssues = issues.filter((issue)=>(issue.priority === Constants.Low)).length;
    return { totalIssues , completedIssues , onWorkingIssues , issueInReview , overdueIssues , assignedIssues, unAssignedIssues,
        reopenedIssues , completionRate , overdueRate , highPriorityIssues , mediumPriorityIssues , lowPriorityIssues , activityRate};
}

export function getFilteredRequestIssues(issues: IssueRequest[] , totalIssues: number){
    const approvedIssues = issues.filter((issue)=>(issue.status === "Approved")).length;
    const rejectedIssues = issues.filter((issue)=>(issue.status === "Rejected")).length;
    const issueAcceptanceRate = totalIssues ? (approvedIssues / totalIssues) * 100 : 0;
    const issueRejectionRate = totalIssues ? (rejectedIssues / totalIssues) * 100 : 0;

    const issueActionTimes = issues
    .filter((issue)=>(issue.actionTakenAt && issue.createdAt))
    .map((issue)=>{
        const actionTime = new Date(issue.actionTakenAt).getTime()
        const createdTime = new Date(issue.createdAt).getTime()
        return actionTime - createdTime;
        }
    );
    const issueActionTime = issueActionTimes.reduce((sum , time)=>(sum + time) , 0);
    const avgIssueAcionTime = issueActionTimes.length > 0 ? 
    ((issueActionTime / issueActionTimes.length) / (1000 * 60 * 60 * 24)).toFixed(0) : 0;
    return { approvedIssues , rejectedIssues , issueAcceptanceRate , 
        issueRejectionRate , avgIssueAcionTime};
}

export function getFilteredReviewIssues(issues: IssueReview[]){
    const totalIssues = issues.length;
    const approvedIssues = issues.filter((issue)=>(issue.status === "Approved")).length;
    const rejectedIssues = issues.filter((issue)=>(issue.status === "Rejected")).length;
    const issueAcceptanceRate = totalIssues ? (approvedIssues / totalIssues) * 100 : 0;
    const issueRejectionRate = totalIssues ? (rejectedIssues / totalIssues) * 100 : 0;

    const issueReviewTimes = issues
    .filter((issue)=>(issue.reviewedAt))
    .map((issue)=>{
        const reviewTime = new Date(issue.reviewedAt).getTime()
        const createdTime = new Date(issue.createdAt).getTime()
        return reviewTime - createdTime
    });
    const issueReviewTime = issueReviewTimes.reduce((sum , time)=>(sum + time) , 0);
    const avgIssueReviewTime = issueReviewTimes.length > 0 ? (issueReviewTime / issueReviewTimes.length) / (1000 * 60 * 60 * 24) : 0;
    return { approvedIssues , rejectedIssues , issueAcceptanceRate , 
        issueRejectionRate , avgIssueReviewTime };
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

export function getPriorityCount(issues: Issue[]){
    const issuePriority = new Map<string , number>();
    if(issues.length > 0){
        for(const issue of issues){
            issuePriority.set(issue.priority , (issuePriority.get(issue.priority) || 0) +1)
        }
    }
    const issuePriorityCount: {priority:string , count:number}[]= [];
    if(issuePriority.size){
        for(const [priority , count] of issuePriority){ 
            issuePriorityCount.push({
                priority,
                count
            })
        }
    }
    return issuePriorityCount;
}

export function getStatusCount(issues: Issue[]){
    const issueStatus = new Map<string , number>();
    if(issues.length > 0){
        for(const issue of issues){
            issueStatus.set(issue.status , (issueStatus.get(issue.status) || 0) +1)
        }
    }
    const issueStatusCount: {status:string , count:number}[]= [];
    if(issueStatus.size){
        for(const [status , count] of issueStatus){ 
            issueStatusCount.push({
                status,
                count
            })
        }
    }
    return issueStatusCount;
}

export function getIssueRequestsData(issueRequests: IssueRequest[]){
    const totalIssueRequests = issueRequests.length;
    const acceptedIssueRequests = issueRequests.filter((issue)=>(issue.status === Constants.Approved)).length;
    const rejectedIssueRequests = issueRequests.filter((issue)=>(issue.status === Constants.Rejected)).length;
    const issueRequestAcceptRate = totalIssueRequests > 0 ? (acceptedIssueRequests / totalIssueRequests) : 0;
    const issueRequestRejectRate = totalIssueRequests > 0 ? (rejectedIssueRequests / totalIssueRequests) : 0;
    return { totalIssueRequests, acceptedIssueRequests, rejectedIssueRequests , issueRequestAcceptRate, issueRequestRejectRate }
}

export function getIssueReviewsData(issueReviews: IssueReview[]){
    const totalIssueReviews = issueReviews.length;
    const acceptedIssueReviews = issueReviews.filter((issue)=>(issue.status === Constants.Approved)).length;
    const rejectedIssueReviews = issueReviews.filter((issue)=>(issue.status === Constants.Rejected)).length;
    const issueReviewAcceptRate = totalIssueReviews > 0 ? (acceptedIssueReviews / totalIssueReviews) : 0;
    const issueReviewRejectRate = totalIssueReviews > 0 ? (rejectedIssueReviews / totalIssueReviews) : 0;
    return { totalIssueReviews, acceptedIssueReviews, rejectedIssueReviews, issueReviewAcceptRate, issueReviewRejectRate }
}