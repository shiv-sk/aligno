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
    return(
        <div className="bg-base-300 rounded-lg w-full py-6 px-3 space-y-2">
            <h1 className="text-center py-2 px-1 font-bold text-xl">Task Info</h1>
            <p className="font-semibold text-lg">project: 
                <span className="font-normal">Project1</span>
            </p>
            <p className="font-semibold text-lg">Task:
                <span className="font-normal">TaskName</span>
            </p>
            <p className="font-semibold text-lg">Description:
                <span className="font-normal">TaskDescription!</span>
            </p>
            <p className="font-semibold text-lg">priority: 
                <span className={`text-base ${priorityBadgeColor} font-normal`}>{"Task Priority"}</span>
            </p>
            <p className="font-semibold text-lg">Status: 
                <span className={`font-normal ${statusBadgeColor}`}>{"Status"}</span>
            </p>  
        </div>
    )
}