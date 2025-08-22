import {adminIssueOverview, employeeIssueOverview, managerIssueOverview, teamLeadIssueOverview} from "@/constents/config";
import { IssueOverview as IssueOverviewType } from "@/types/issueoverview";

export default function IssueOverview({role , issueOverview}: {role:string , issueOverview:IssueOverviewType | null | undefined}){
    
    return(
        <div className="bg-base-300 rounded-lg shadow-lg py-6 px-3 space-y-6 w-full mb-6">
            <h1 className="text-center font-semibold text-xl">TaskOverview</h1>
            {
                role === "TeamLead" && issueOverview ? (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{teamLeadIssueOverview.totalProjectIssues}</p>
                                <p className="badge badge-primary tooltip" data-tip="Total tasks in this project">
                                    {issueOverview?.totalIssuesofProject}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{teamLeadIssueOverview.totalAssignedIssues}</p>
                                <p className="badge badge-info tooltip" data-tip="Tasks assigned by you in this project">
                                    {issueOverview?.totalAssignedIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{teamLeadIssueOverview.completedIssues}</p>
                                <p className="badge badge-success tooltip" data-tip="Completed tasks assigned by you">
                                    {issueOverview?.completedIssues}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{teamLeadIssueOverview.issueInReview}</p>
                                <p className="badge badge-secondary tooltip" data-tip="Tasks currently in review (assigned by you)">
                                    {issueOverview?.issueInReview}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{teamLeadIssueOverview.overdueIssues}</p>
                                <p className="badge badge-warning tooltip" data-tip="Overdue tasks assigned by you">
                                    {issueOverview?.overdueIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{teamLeadIssueOverview.reopenedIssues}</p>
                                <p className="badge badge-error tooltip" data-tip="Reopened tasks assigned by you">
                                    {issueOverview?.reopenedIssues}
                                </p>
                            </div>
                        </div>
                    </>
                ) : role === "Manager" && issueOverview ? (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.createdIssues}</p>
                                <p className="badge badge-primary tooltip" data-tip="Total tasks created by you">
                                    {issueOverview?.totalIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.openIssues}</p>
                                <p className="badge badge-secondary tooltip" data-tip="Open tasks from those you created">
                                    {issueOverview?.openIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.closedIssues}</p>
                                <p className="badge badge-success tooltip" data-tip="Closed tasks from those you created">
                                    {issueOverview?.completedIssues}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.issueInReview}</p>
                                <p className="badge badge-info tooltip" data-tip="Tasks in review from those you created">
                                    {issueOverview?.issueInReview}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.overdueIssues}</p>
                                <p className="badge badge-warning tooltip" data-tip="Overdue tasks from those you created">
                                    {issueOverview?.overdueIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.reopenedIssues}</p>
                                <p className="badge badge-error tooltip" data-tip="Reopened tasks from those you created">
                                    {issueOverview?.reopenedIssues}
                                </p>
                            </div>
                        </div>
                    </>
                ) : role === "Admin" && issueOverview ? (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{adminIssueOverview.totalIssues}</p>
                                <p className="badge badge-primary tooltip" data-tip="Total tasks created in the project">
                                    {issueOverview?.totalIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{adminIssueOverview.assignedIssues}</p>
                                <p className="badge badge-info tooltip" data-tip="Total tasks assigned in the project">
                                    {issueOverview?.assignedIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{adminIssueOverview.unAssignedIssues}</p>
                                <p className="badge badge-secondary tooltip" data-tip="Total unassigned tasks in the project">
                                    {issueOverview?.unAssignedIssues}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{adminIssueOverview.completedIssues}</p>
                                <p className="badge badge-success tooltip" data-tip="Total completed tasks in the project">
                                    {issueOverview?.completedIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.overdueIssues}</p>
                                <p className="badge badge-warning tooltip" data-tip="Total overdue tasks in the project">
                                    {issueOverview?.overdueIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{managerIssueOverview.reopenedIssues}</p>
                                <p className="badge badge-error tooltip" data-tip="Total reopened tasks in the project">
                                    {issueOverview?.reopenedIssues}
                                </p>
                            </div>
                        </div>
                    </>
                ) : role === "Employee" && issueOverview && (
                    <>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{employeeIssueOverview.totalAssignmentRequestedIssues}</p>
                                <p className="badge badge-primary tooltip" data-tip="Total task assignment requests made by you">
                                    {issueOverview?.totalAssignmentRequestedIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{employeeIssueOverview.assignedIssues}</p>
                                <p className="badge badge-info tooltip" data-tip="Total tasks assigned through your requests">
                                    {issueOverview?.assignedIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{employeeIssueOverview.completedIssues}</p>
                                <p className="badge badge-success tooltip" data-tip="Total tasks completed that were assigned to you">
                                    {issueOverview?.completedIssues}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{employeeIssueOverview.totalReviewRequest}</p>
                                <p className="badge badge-secondary tooltip" data-tip="Total tasks sent for review that were assigned to you">
                                    {issueOverview?.totalReviewRequest}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{employeeIssueOverview.reviewAcceptedIssues}</p>
                                <p className="badge badge-success tooltip" data-tip="Total reviews accepted from request">
                                    {issueOverview?.reviewAcceptedIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{employeeIssueOverview.reopenedIssues}</p>
                                <p className="badge badge-error tooltip" data-tip="Total reopened tasks from your assigned tasks">
                                    {issueOverview?.reopenedIssues}
                                </p>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}