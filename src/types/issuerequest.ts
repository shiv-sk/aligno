interface IssueRequest{
    _id:string,
    requestedBy:{
        _id:string,
        name:string,
        email:string
    },
    issueId:{
        _id:string,
        name:string,
        projectId:string,
        description:string, 
        status:string, 
        priority:string,
    },
}
export default IssueRequest;