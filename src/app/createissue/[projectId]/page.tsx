/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { allowedDomains } from "@/constents/domainconstants";
import { useAuth } from "@/context/authcontext";
import { useParams, useRouter } from "next/navigation";
import { file } from "pdfkit";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateIssue(){
    const {projectId} = useParams();
    const {user, isLoading:authLoading} = useAuth();
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);
    const [links , setLinks] = useState<string[]>([]);
    const [files , setFiles] = useState<File[]>([]);
    const [link , setLink] = useState("");
    const [issueData , setIssueData] = useState({
        name:"",
        description:"",
        duedate:"",
        projectId:projectId ? projectId : null,
        priority:"",
        links,
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
            const formData = new FormData();
            formData.append("description" , issueData.description);
            formData.append("name" , issueData.name);
            formData.append("duedate" , issueData.duedate);
            formData.append("priority" , issueData.priority);
            if(typeof projectId === "string"){
                formData.append("projectId" , projectId);
            }else if(Array.isArray(projectId) && projectId.length > 0){
                formData.append("projectId" , projectId[0]);
            }
            
            if(links.length > 0){
                links.forEach((link)=> formData.append("links" , link));
            }
            if(files.length > 0){
                files.forEach((file)=>formData.append("files" , file));
            }
            const response = await postAndPatchReq(`/api/issue` , "POST" , formData , true);
            if(response.success){
                // console.log("response from createIssue page! " , response);
                toast.success("Task created successfully! ");
                // router.push(`/allissues/${projectId}`);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error from getAllProjectPage! " , error);
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    const handleOnChange = (e:any)=>{
        setIssueData({...issueData , [e.target.name]:e.target.value}) 
    }
    const date = ()=>{
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        return tomorrowDate.toISOString().split("T")[0];
    }
    const addLinks = ()=>{
        if(!link.trim()){
            toast.warning("please add valid links");
            return;
        }
        let parsedUrl;
        try {
            parsedUrl = new URL(link);
        } catch (error) {
            toast.warning("Invalid URL format!");
            return;
        }
        const hostname = parsedUrl.hostname;
        console.log("the hostname: " , hostname)
        const isAllowed = allowedDomains.some((domain)=>hostname.includes(domain));
        if(!isAllowed){
            toast.warning("Only Google Drive, Docs, Sheets, Slides, Gitlab, Figma, Notion, GitHub,  links are allowed!");
            return;
        }
        const duplicateLink = links.some((val)=>(val === link));
        if(duplicateLink){
            toast.warning("link is already added!");
            return;
        }
        setLinks([...links , link]);
        setLink("");
        // toast.warning("please avoid links work is in progress");
    }
    const removeLink = (link: string)=>{
        const updatedLinks = links.filter((val)=>(val !== link));
        setLinks(updatedLinks);
    }
    const handleFilsUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const newFiles = Array.from(e.target.files || []);
        if(newFiles.length + files.length > 4){
            toast.error("only 4 files are allowed!");
            return;
        }
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        toast.warning(`4 of ${files.length + newFiles.length} files selected`);
    } 
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
                            />
                            <p className="btn btn-primary rounded-2xl w-[50px]" onClick={addLinks}>Add</p>
                        </div>
                        {
                            links && links.length > 0 && (
                                links.map((link , index)=>(
                                    <div key={index} className="flex gap-1.5">
                                    <input 
                                        type="text"
                                        disabled={true}  
                                        className="input w-full shadow-md"
                                        value={link}
                                        />
                                        <p className="btn btn-primary rounded-xl w-[80px]" 
                                        onClick={()=>removeLink(link)}>remove</p> 
                                    </div>
                                ))
                            )
                        }
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Pick a file</legend>
                            <input 
                            type="file" 
                            className="file-input w-full shadow-md"
                            multiple
                            accept=".png,.jpg,.jpeg,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleFilsUpload}/>
                            <label className="label text-sm text-gray-500">
                                Allowed only: .png, .jpeg, .jpg, .pdf, .xls, .xlsx
                            </label>
                            {
                                files && files.length > 0 && (
                                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                                        {
                                            files.map((file , index)=>(
                                                <li className="list-none" key={index}>{file.name}</li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </fieldset>
                        <button 
                        type="submit" 
                        className="btn w-full btn-neutral rounded-2xl text-lg font-semibold shadow-xl" 
                        disabled={isLoading}>
                            {isLoading ? <span className="loading loading-spinner loading-xs"></span> :"Create"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}