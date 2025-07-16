/* eslint-disable @typescript-eslint/no-explicit-any */
import Constants from "@/constents/constants";
import issueData from "@/types/issueData";

export default function IssueData({issueData} :{issueData:issueData}){
    let priorityBadgeColor = "";
    switch(issueData?.priority){
        case Constants.High:
            priorityBadgeColor = "badge badge-primary"
            break;
        case Constants.Medium:
            priorityBadgeColor = "badge badge-secondary"
            break;
        case Constants.Low:
            priorityBadgeColor = "badge badge-accent"
            break;
    }
    function getDayDifference(){
        const today:any = new Date();
        const duedate:any = issueData?.duedate ? new Date(issueData.duedate) : null;
        if(!duedate){
            return null;
        }
        const difference = duedate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        if(differenceInDays < 0){
            return (
                <div className="tooltip" data-tip={`Task is overdue by ${Math.abs(differenceInDays)} day(s)`}>
                    <span className="badge badge-error">Overdue</span>
                </div>
            )
        }
        else if(differenceInDays > 0){
            return (
                <div className="tooltip" data-tip={`Due in ${differenceInDays} day(s)`}>
                    <span className="badge badge-info">In Progress</span>
                </div>
            )
        }
        else{
           return (
                <div className="tooltip" data-tip="Due today">
                    <span className="badge badge-warning">Due Today</span>
                </div>
            ) 
        }
    }
    return(
        <div className="px-3 space-y-1 bg-base-300 shadow-md py-6 rounded-xl">
            <h1 className="text-center font-bold text-lg border-b-2">TaskInfo</h1>
            <h2 className="text-lg">Task: 
                <span className="text-base">{issueData.issueName || "TaskName"}</span>
            </h2>
            <p className="text-lg">Description: 
                <span className="text-base"> {issueData.description || "Task Description"}</span>
            </p>
            <p className={`text-lg`}>Priority: 
                <span className={`text-base ${priorityBadgeColor}`}>{issueData.priority || "Task Priority"}</span>
            </p>
            <div className="text-lg">Duedate: 
                <span className="text-base">{issueData.duedate?.split("T")[0] || "Task Duedate"}</span>
                <span className="pl-1 text-base">{getDayDifference()}</span>
            </div>
        </div>
    )
}