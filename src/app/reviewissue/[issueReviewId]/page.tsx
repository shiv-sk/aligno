/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import ReviewIssueComponent from "@/components/reviewissue";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ReviewIssue(){

    const [isLoading , setIsLoading] = useState(false);
    const [issueReviewData , setIssueReviewData] = useState(null);
    const {issueReviewId} = useParams();

    useEffect(()=>{
        if(!issueReviewId){
            return;
        }
        const getIssueReview = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/issuereview/${issueReviewId}` , "GET");
                if(response.success){
                    console.log("response from issueReview Page! " , response);
                    setIssueReviewData(response.data);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getIssueReview();
    } , [issueReviewId]);
    return(
        <div className="bg-base-300 min-h-screen">
            <div>
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    ) :
                    issueReviewData ? (
                        <div className="flex justify-center py-6">
                            <ReviewIssueComponent issue={issueReviewData}/>  
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-lg font-semibold">
                                Sorry, we couldn&apos;t find this issue. It might have been deleted or moved!.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}