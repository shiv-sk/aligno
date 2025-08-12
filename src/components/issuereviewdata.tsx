import Constants from "@/constents/constants";
import { IssueData } from "@/types/issuereviewdetail";

export default function IssueReviewData({issue}:  {issue: IssueData}){
    let statusBadgeColor = "";
    let priorityBadgeColor = "";
    switch(issue?.issueStatus){
        case Constants.Assigned:
            statusBadgeColor = "badge badge-info text-center"
            break;
        case Constants.Open:
            statusBadgeColor = "badge badge-neutral text-center"
            break;
        case Constants.Review:
            statusBadgeColor = "badge badge-secondary text-center"
            break;
        case Constants.Reopened:
            statusBadgeColor = "badge badge-accent text-center"
            break;
        case Constants.Closed:
            statusBadgeColor = "badge badge-success text-center"
            break;
        default:
            statusBadgeColor = "badge badge-success text-center"
            break;
    }
    switch(issue?.priority){
        case Constants.High:
            priorityBadgeColor = "badge badge-neutral text-center"
            break;
        case Constants.Low:
            priorityBadgeColor = "badge badge-primary text-center"
            break;
        case Constants.Medium:
            priorityBadgeColor = "badge badge-secondary text-center"
            break;
        default:
            priorityBadgeColor = "badge badge-secondary text-center"
            break;
    }
    function getDueDateBadge(){
        if(!issue){
            return;
        }
        const today = new Date();
        const due = new Date(issue.duedate);
        if(today > due){
            return(
                <div className="tooltip tooltip-error" data-tip="Issue is overdue!">
                    <span className="badge badge-error">Overdue</span>
                </div>
            )
        }else{
            return(
                <div className="tooltip tooltip-info" data-tip="Upcoming due date">
                    <span className="badge badge-info">Upcoming</span>
                </div>
            )
        }
    }
    return(
        <div className="bg-base-300 rounded-lg w-full py-6 px-3 space-y-2">
            <h1 className="text-center py-2 px-1 font-bold text-xl">Task Info</h1>
            <p className="font-semibold text-lg">project: 
                <span className="font-normal">{issue?.projectName || "ProjectName"}</span>
            </p>
            <p className="font-semibold text-lg">Task:
                <span className="font-normal">{issue.name || "TaskName"}</span>
            </p>
            <p className="font-semibold text-lg">Description:
                <span className="font-normal">{issue.description || "Task Description"}</span>
            </p>
            <p className="font-semibold text-lg">priority: 
                <span className={`text-base ${priorityBadgeColor} font-normal`}>{issue.priority || "Task Priority"}</span>
            </p>
            <p className="font-semibold text-lg">Status: 
                <span className={`font-normal ${statusBadgeColor}`}>{issue.issueStatus || "Task Status"}</span>
            </p>  
            <div className="font-semibold text-lg flex flex-wrap gap-1.5">Due:
                <span className={`font-normal`}>{issue.duedate ? new Date(issue.duedate).toDateString() : "Task Duedate"}</span>
                <div>{getDueDateBadge() || "Duedate"}</div>
            </div>  
        </div>
    )
}