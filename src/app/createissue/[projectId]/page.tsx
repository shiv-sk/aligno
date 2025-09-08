/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateIssue(){
    const {projectId} = useParams();
    const {user, isLoading:authLoading} = useAuth();
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);
    // const [links , setLinks] = useState<string[]>([]);
    const [link , setLink] = useState("");
    const [issueData , setIssueData] = useState({
        name:"",
        description:"",
        duedate:"",
        projectId:projectId ? projectId : null,
        priority:"",
    });

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);
    
    const handleCreateIssue = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!user || !user._id || !projectId){
            return;
        }
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issue` , "POST" , issueData);
            if(response.success){
                // console.log("response from createIssue page! " , response);
                toast.success("Task created successfully! ");
                router.push(`/allissues/${projectId}`);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error from getAllProjectPage! " , error);
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    const handleOnChange = (e)=>{
        setIssueData({...issueData , [e.target.name]:e.target.value}) 
    }
    const date = ()=>{
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        return tomorrowDate.toISOString().split("T")[0];
    }
    const addLinks = ()=>{
        // if(!link.trim()){
        //     toast.warning("please add valid links");
        //     return;
        // }
        // const duplicateLink = links.some((val)=>(val === link));
        // if(duplicateLink){
        //     toast.warning("link is already added!");
        //     return;
        // }
        // setLinks([...links , link]);
        // setLink("");
        toast.warning("please avoid links work is in progress");
    }
    // const removeLink = (link: string)=>{
    //     const updatedLinks = links.filter((val)=>(val !== link));
    //     setLinks(updatedLinks);
    // } 
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5 bg-base-200">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-xl bg-base-100">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">New Task</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleCreateIssue}>
                    <label htmlFor="name" className="text-md font-medium">Title</label>    
                    <input
                    name="name" 
                    type="text"
                    id="name" 
                    placeholder="Task1" 
                    className="input w-full shadow-md"
                    value={issueData.name}
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
                        <option>Select a Priority</option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>
                    <label htmlFor="links" className="text-md font-medium">Links</label>
                    <div className="flex flex-col gap-1.5">  
                    <input
                    name="links" 
                    type="text"
                    id="links" 
                    placeholder="https://docs.google.com" 
                    className="input w-full shadow-md"
                    value={link}
                    onChange={(e)=>setLink(e.target.value)} 
                    required
                    />
                    <p className="btn btn-primary w-[50px]" onClick={addLinks}>Add</p>
                    </div>
                    {/* {
                        links && links.length > 0 && (
                            links.map((link , index)=>(
                                <div key={index} className="flex gap-1.5">
                                   <input 
                                    type="text"
                                    disabled={true}  
                                    className="input w-full shadow-md"
                                    value={link}
                                    />
                                    <p className="btn btn-primary w-[80px]" onClick={()=>removeLink(link)}>remove</p> 
                                </div>
                            ))
                        )
                    } */}
                    <button 
                    type="submit" 
                    className="btn w-full btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>{isLoading ? <span className="loading loading-spinner loading-xs"></span> :"Create"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}