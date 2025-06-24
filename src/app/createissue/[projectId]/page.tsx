"use client";

import { useAuth } from "@/context/authcontext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CreateIssue(){
    const {projectId} = useParams();
    const {user} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const [issueData , setIssueData] = useState({
        title:"",
        description:"",
        duedate:"",
        createdBy:"",
        projectId:"",
        priority:""
    });
    const handleCreateIssue = (e)=>{
        e.preventDefault();
        if(!user || !user._id || !projectId){
            return;
        }
        setIsLoading(true);
        try {
            console.log("issue data is! " , issueData);
        } catch (error) {
            console.error("error from createIssue page!" , error);
        }finally{
            setIsLoading(false);
        }
    }
    const handleOnChange = (e)=>{
        e.preventDefault();
        setIssueData({...issueData , [e.target.name]:e.target.value});
    }
    const date = ()=>{
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        return tomorrowDate.toISOString().split("T")[0];
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5 bg-base-200">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-xl bg-base-100">
                <h1 className="text-center font-bold text-2xl mb-4">New Issue</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleCreateIssue}>
                    <label htmlFor="title" className="text-md font-medium">Title</label>    
                    <input
                    name="title" 
                    type="text"
                    id="title" 
                    placeholder="Task1" 
                    className="input w-full shadow-md"
                    value={issueData.title}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="description" className="text-md font-medium">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    className="textarea w-full shadow-md"
                    value={issueData.description}
                    onChange={handleOnChange} 
                    placeholder="Description of Task1"
                    required></textarea>
                    <label htmlFor="duedate" className="text-md font-medium">Duedate</label>    
                    <input
                    name="duedate" 
                    type="Date"
                    id="date" 
                    className="input w-full shadow-md"
                    value={issueData.duedate}
                    min={date()}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="role" className="text-md font-medium mb-1">Select Priority</label>
                    <select value={issueData.priority} 
                    className="select w-full shadow-md" name="priority" id="priority" onChange={handleOnChange}>
                        <option disabled={true}>Select a Priority</option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>
                    <button 
                    type="submit" 
                    className="btn w-full btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>{isLoading ? "Processing..." :"Create"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}