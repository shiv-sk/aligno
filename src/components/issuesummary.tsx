import Constants from "@/constents/constants";
import { Issue } from "@/types/issue";

export default function IssueSummary({issue}: {issue:Issue | null}){
    let statusBadgeColor = "";
    let priorityBadgeColor = "";
    switch(issue?.status){
        case Constants.Assigned:
            statusBadgeColor = "badge badge-info text-center font-semibold"
            break;
        case Constants.Open:
            statusBadgeColor = "badge badge-neutral text-center font-semibold"
            break;
        case Constants.Review:
            statusBadgeColor = "badge badge-secondary text-center font-semibold"
            break;
        case Constants.Reopened:
            statusBadgeColor = "badge badge-accent text-center font-semibold"
            break;
        case Constants.Closed:
            statusBadgeColor = "badge badge-success text-center font-semibold"
            break;
        default:
            statusBadgeColor = "badge badge-success text-center font-semibold"
            break;
    }
    switch(issue?.priority){
        case Constants.High:
            priorityBadgeColor = "badge badge-neutral text-center font-semibold"
            break;
        case Constants.Low:
            priorityBadgeColor = "badge badge-primary text-center font-semibold"
            break;
        case Constants.Medium:
            priorityBadgeColor = "badge badge-secondary text-center font-semibold"
            break;
        default:
            priorityBadgeColor = "badge badge-secondary text-center font-semibold"
            break;
    }
    function getDueDateBadge(){
        if(!issue){
            return;
        }
        const today = new Date();
        const completed = issue.completedAt ? new Date(issue.completedAt) : null;
        const due = new Date(issue.duedate);
        if(issue.status === "Closed"){
            if(completed && completed > due){
                return(
                    <div className="tooltip tooltip-warning" data-tip="Completed but overdue">
                        <span className="badge badge-warning">Late Completion</span>
                    </div>
                )
            }else if(completed && completed <= due){
                return(
                    <div className="tooltip tooltip-success" data-tip="Completed on time">
                        <span className="badge badge-success">On-Time</span>
                    </div>
                )
            }
        }
        else{
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
        return null;
    }
    return(
        <div className="bg-base-100 shadow-lg rounded-lg space-y-2 px-3 py-6">
            <h1 className="border-b-2 border-b-gray-300 text-xl font-semibold">Issue-Summary</h1>
            <div 
            className="flex flex-col gap-2.5 md:gap-2 md:flex-row md:justify-evenly md:items-center">
                <div className="font-medium text-xl">Status: 
                    <span className={`${statusBadgeColor}`}>{issue?.status || "Status"}</span>
                </div>
                <div className="font-medium text-xl px-0.5">Duedate: 
                    <span className="badge badge-error">
                        {issue?.duedate ? new Date(issue.duedate).toDateString() : "N/A"}
                    </span>
                    {getDueDateBadge()}
                </div>
                <div className="font-medium text-xl">Priority: 
                    <span className={`${priorityBadgeColor}`}>{issue?.priority || "Priority"}</span>
                </div>
            </div>
                
        </div>
    )
}