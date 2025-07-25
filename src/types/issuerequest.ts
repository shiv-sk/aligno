interface IssueRequest{
    _id:string,
    requestedBy:{
        _id:string,
        name:string,
        email:string
    },
    actionTakenBy:{
        _id:string,
        name:string,
    },
    issueId:{
        _id:string,
        name:string,
        projectId:string,
        description:string, 
        status:string, 
        priority:string,
    },
    createdAt:Date,
    actionTakenAt:Date,
    status:string
}
export default IssueRequest;