/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function AddProject(){
    const {user} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const [projectData , setProjectData] = useState({
        name:"",
        description:"",
        createdBy:user ? user._id : null
    })

    const handleOnChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        setProjectData({...projectData , [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.entries(projectData).length === 0){
            toast.error("data is required! ");
            return;
        }
        if(!user){
            toast.error("user is null! ");
        }

        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/project` , "POST" , projectData);
            console.log(response);
            if(response.success){
                toast.success("project added!");
            }
            // console.log("the data is! " , {projectData , user});
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error addProjectPage! " , error);
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">AddProject</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="text-md font-medium">Name</label>    
                    <input
                    name="name" 
                    type="text"
                    id="name" 
                    placeholder="project1" 
                    className="input w-full shadow-md"
                    value={projectData.name}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="description" className="text-md font-medium">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    className="textarea w-full shadow-md"
                    value={projectData.description}
                    onChange={handleOnChange} 
                    placeholder="Description of project"
                    required></textarea>
                    <button 
                    type="submit" 
                    className="btn w-full mt-2 btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>{isLoading ? "Processing..." :"Add"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}