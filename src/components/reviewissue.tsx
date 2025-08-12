/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import IssueReviewData from "./issuereviewdata";
import { IssueTimelineResponse } from "@/types/issuereviewdetail";
import IssueReviewSummary from "./issuereviewsummary";
import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ReviewIssue({issue , issueReviewId}: {issue: IssueTimelineResponse , issueReviewId: string | undefined | null}){
    const createdAt = issue.timeLine && issue.timeLine.length > 0 ? issue.timeLine[0]?.timeStamp : null;
    const assignmentRequest = issue.timeLine && issue.timeLine.length > 0 ? issue.timeLine[1]?.timeStamp : null;
    const assignmentRequestReview = issue.timeLine && issue.timeLine.length > 0 ? issue.timeLine[2]?.timeStamp : null;
    const assignedAt = issue.timeLine && issue.timeLine.length > 0 ? issue.timeLine[3]?.timeStamp : null;
    const reviewRequest = issue.timeLine && issue.timeLine.length > 0 ? issue.timeLine[4]?.timeStamp : null;
    const reviewedAt = issue.timeLine && issue.timeLine.length > 0 ? issue.timeLine[5]?.timeStamp : null;

    function calculateDelay(timeStamp1?: Date | null, timeStamp2?: Date | null){
        const today = new Date();
        if(!timeStamp1 && !timeStamp2){
            return null;
        }
        if(!timeStamp1 && timeStamp2){
            return timeStamp2.getTime() - today.getTime();
        }
        else if(timeStamp1 && !timeStamp2){
            return today.getTime() - timeStamp1.getTime();
        }
        else if(timeStamp1 && timeStamp2){
            return timeStamp2.getTime() - timeStamp1.getTime();
        }
        return null;
    }
    
    const delays: (number | null)[] = [];
    const datePairs: [Date | string | null | undefined, Date | string | null | undefined][] = [
        [createdAt, createdAt],
        [assignmentRequest, createdAt],
        [assignmentRequestReview, assignmentRequest],
        [assignedAt, assignmentRequestReview],
        [reviewRequest, assignedAt],
        [reviewedAt, reviewRequest],
    ];

    datePairs.forEach(([d1 , d2] , index)=>{
        if(index === 0){
            delays.push(0);
        }
        else{
            const delay = calculateDelay(d1 ? new Date(d1) : null , d2 ? new Date(d2) : null);
            const delayInDays = delay ? delay / (1000 * 60 * 60 * 24) : null;
            delays.push(delayInDays);
        }
    })
    const [isLoading , setIsLoading] = useState(false);
    const handleAcceptIssueReview = async()=>{
        if(!issueReviewId){
            return;
        }
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`/api/issuereview/acceptissue/${issueReviewId}` , "PATCH" , {});
            if(response.success){
                console.log("response from issueReview page! " , response);
                toast.success("Task Review Accepted!");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="bg-base-100 py-6 px-4 rounded-lg md:w-[600px] w-96 space-y-6 shadow-lg">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Task Review Request</h1>
            <IssueReviewData issue={issue.issueData} />
            <div>
                <h1 className="text-center text-lg py-2 px-1">Task Progress Timeline</h1>
                <ul className="timeline timeline-vertical">
                    {
                        issue && issue.timeLine.length > 0 ? issue.timeLine.map((issue , index)=>(
                            <li key={issue.label + index}>
                                <hr className="bg-primary" />
                                <div className={`${index % 2 === 0 ? "timeline-start" : "timeline-end"} timeline-box`}>
                                    <p className="font-bold">
                                        {issue.label ?? "Task Label"}
                                    </p>
                                    <p className="font-bold"> 
                                        <span className="font-normal">{issue.by.name ?? "N/A"}</span>
                                    </p>
                                    <p className="font-bold">At:
                                        <span className="font-normal">
                                            {issue.timeStamp ? new Date(issue.timeStamp).toDateString() : "N/A"}
                                        </span>
                                    </p>
                                    <p className="font-bold">delay: 
                                        <span className="font-normal">
                                            {
                                                delays && delays.length > 0 ? delays[index]?.toFixed(0) : "N/A"
                                            }&nbsp;days
                                        </span>
                                    </p>
                                </div>
                                <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="text-primary h-5 w-5"
                                >
                                    <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 
                                    10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                    />
                                </svg>
                                </div>
                                <hr className="bg-primary" />
                            </li>
                        )) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Sorry, we couldn&apos;t find this TaskTimeLine. It might have been deleted or moved!.
                                </p>
                            </div>
                        )
                    }
                </ul>
            </div>
            <IssueReviewSummary issue={issue.reviewSummary}/>
            <div className="card-actions justify-end">
                <button
                onClick={handleAcceptIssueReview}
                disabled={isLoading}
                title="click to accept review" 
                className="btn btn-primary">{isLoading ? 
                <span className="loading loading-spinner loading-xs"></span> : "Accept"}
                </button>
                <button className="btn btn-secondary">Reject</button>
            </div>
        </div>
    )
}