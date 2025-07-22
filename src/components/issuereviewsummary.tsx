import Constants from "@/constents/constants";
import { ReviewSummary } from "@/types/issuereviewdetail";

export default function IssueReviewSummary({issue}: {issue: ReviewSummary}){
    let statusBadgeColor = "";
    switch(issue?.status){
        case Constants.Pending:
            statusBadgeColor = "badge badge-neutral text-center"
            break;;
        case Constants.Rejected:
            statusBadgeColor = "badge badge-accent text-center"
            break;
        case Constants.Approved:
            statusBadgeColor = "badge badge-success text-center"
            break;
        default:
            statusBadgeColor = "badge badge-info text-center"
            break;
    }
    return(
        <div className="bg-base-200 py-6 px-3 rounded-lg w-full space-y-1">
            <h1 className="text-center text-lg py-2 px-1">Task Review Summary</h1>
            <div>
                <p>Comments:{issue.comment ?? "comments from DB!"}</p>
            </div>
            <div>
                <p>Attachments:Comming Soon!</p>
            </div>
            <div>
                <p>Status:
                    <span className={`font-normal ${statusBadgeColor}`}>{issue.status ?? "Review Status"}</span>
                </p>
            </div>
        </div>
    )
}