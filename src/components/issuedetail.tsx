/* eslint-disable @typescript-eslint/no-explicit-any */
import Constants from "@/constents/constants";
import {Issue} from "@/types/issue";
import IssueSummary from "./issuesummary";
import UserInfo from "./userinfo";
import TaskInfo from "./taskinfo";
import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/authcontext";

export default function Issuedetail({issue , role}: {issue:Issue | null , role:string}){
    
    const {user} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const [isReviewLoading , setIsReviewLoading] = useState(false);
    const [reviewIssueData , setReviewIssueData] = useState({
        issueId:"",
        requestedBy:"",
        comment:""
    });
    const commentRef = useRef<HTMLDialogElement | null>(null);

    const handleClaimIssue = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!issue || !issue._id){
            return;
        }
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issuerequest/` , "POST" , {issueId:issue._id});
            if(response.success){
                toast.success("Claim Request added successfully!")
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }

    const openModal = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
            commentRef.current?.showModal();
        } catch (error) {
            console.error("Dailogbox error! " , error);
        }
    }

    const closeModal = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!reviewIssueData.issueId || !reviewIssueData.requestedBy){
            return;
        }
        setIsReviewLoading(true);
        commentRef.current?.close();
        try {
            const response = await postAndPatchReq(`/api/issuereview/` , "POST" , reviewIssueData);
            if(response.success){
                // console.log("response from review issue component! " , response);
                toast.success("Task sent to review stage! ");
                setReviewIssueData({
                    issueId:"",
                    requestedBy:"",
                    comment:""
                })
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsReviewLoading(false);
        }
    }

    useEffect(()=>{
        if(issue && issue._id && issue.assignedTo?._id){
            setReviewIssueData({
                issueId: issue._id,
                requestedBy: issue.assignedTo._id,
                comment: ""
            })
        }
    } , [issue])

    return(
        <div className="bg-base-100 shadow-lg rounded-lg space-y-6 px-3 py-6 md:w-[720px] w-96">
            <TaskInfo issue={issue} />
            <UserInfo issue={issue}/>
            <IssueSummary issue={issue} />
            <dialog ref={commentRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add a Comment</h3>
                    <textarea
                    className="textarea textarea-bordered w-full mt-3"
                    placeholder="Type your comment here" 
                    name="comment"
                    value={reviewIssueData.comment}
                    onChange={(e)=>setReviewIssueData({...reviewIssueData , comment:e.target.value})}/>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button  
                        onClick={closeModal} 
                        className="btn">Confirm</button>
                    </form>
                    </div>
                </div>
            </dialog>
            <div className="flex justify-end items-center gap-3">
                {
                    role === Constants.Employee && (
                        <button 
                        className="btn btn-primary" 
                        disabled={!!issue?.assignedTo?._id}
                        title={!!issue?.assignedTo?._id ? "This task has already been claimed." : "Click to claim this task."}
                        onClick={handleClaimIssue}
                        >{isLoading ? <span className="loading loading-spinner loading-xs"></span> : "Claim"}</button>
                    )
                }
                {
                    role === Constants.Employee && issue?.assignedTo?._id === user?._id &&(
                        <button 
                        className="btn btn-primary" 
                        disabled={issue?.status === Constants.Review}
                        onClick={openModal}
                        title="Click to send completion request for this task"
                        >{isReviewLoading ? <span className="loading loading-spinner loading-xs"></span> : "Mark As Done"}</button>
                    )
                }
                {
                    role === Constants.TeamLead &&(
                        <button 
                        className="btn btn-primary" 
                        disabled={!!issue?.assignedTo._id && issue.status !== Constants.Open}
                        title={issue?.status === Constants.Assigned ? "Task is assigned" : "Assign Task"}
                        >{isLoading ? <span className="loading loading-spinner loading-xs"></span> : "Assign"}</button>
                    )
                }
                {
                    role === Constants.TeamLead && issue?.assignedBy._id === user?._id &&(
                        <button 
                        className="btn btn-primary" 
                        disabled={isLoading}
                        title="Click to unassign this task"
                        >{isLoading ? <span className="loading loading-spinner loading-xs"></span> : "UnAssign"}</button>
                    )
                }
                {
                    role === Constants.Manager && (
                        <button 
                        className="btn btn-primary" 
                        disabled={isLoading}
                        title="update task"
                        >{isLoading ? <span className="loading loading-spinner loading-xs"></span> : "Update"}</button>
                    )
                }
            </div>
        </div>
    )
}