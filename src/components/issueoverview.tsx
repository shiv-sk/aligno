import {adminIssueOverview, managerIssueOverview, teamLeadIssueOverview} from "@/constents/config";
import { IssueOverview as IssueOverviewType } from "@/types/issueoverview";

export default function IssueOverview({role , issueOverview}: {role:string , issueOverview:IssueOverviewType | null | undefined}){
    
    return(
        <div className="bg-base-300 rounded-lg shadow-lg py-6 px-3 space-y-6 w-full mb-6">
            <h1 className="text-center font-semibold text-xl">TaskOverview</h1>
            {
                role === "TeamLead" && issueOverview ? (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{teamLeadIssueOverview.totalProjectIssues}</p>
                                <p>{issueOverview?.totalIssuesofProject}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{teamLeadIssueOverview.totalAssignedIssues}</p>
                                <p>{issueOverview?.totalAssignedIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{teamLeadIssueOverview.completedIssues}</p>
                                <p>{issueOverview?.completedIssues}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{teamLeadIssueOverview.issueInReview}</p>
                                <p>{issueOverview?.issueInReview}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{teamLeadIssueOverview.overdueIssues}</p>
                                <p>{issueOverview?.overdueIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{teamLeadIssueOverview.reopenedIssues}</p>
                                <p>{issueOverview?.reopenedIssues}</p>
                            </div>
                        </div>
                    </>
                ) : role === "Manager" && issueOverview ? (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.createdIssues}</p>
                                <p>{issueOverview?.totalIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.assignedIssues}</p>
                                <p>{issueOverview?.assignedIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.closedIssues}</p>
                                <p>{issueOverview?.completedIssues}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.issueInReview}</p>
                                <p>{issueOverview?.issueInReview}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.overdueIssues}</p>
                                <p>{issueOverview?.overdueIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.reopenedIssues}</p>
                                <p>{issueOverview?.reopenedIssues}</p>
                            </div>
                        </div>
                    </>
                ) : role === "Admin" && issueOverview && (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{adminIssueOverview.totalIssues}</p>
                                <p>{issueOverview?.totalIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{adminIssueOverview.assignedIssues}</p>
                                <p>{issueOverview?.assignedIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{adminIssueOverview.unAssignedIssues}</p>
                                <p>{issueOverview?.unAssignedIssues}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{adminIssueOverview.completedIssues}</p>
                                <p>{issueOverview?.completedIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.overdueIssues}</p>
                                <p>{issueOverview?.overdueIssues}</p>
                            </div>
                            <div className="flex flex-col text-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                                <p>{managerIssueOverview.reopenedIssues}</p>
                                <p>{issueOverview?.reopenedIssues}</p>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}