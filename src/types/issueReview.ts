interface IssueReview{
    _id:string,
    requestedBy:{
        _id:string,
        name:string,
        email:string
    },
    reviewedBy:{
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
    reviewedAt:Date,
    status:string,
    comment:string , 
    attachment:string
}
export default IssueReview;