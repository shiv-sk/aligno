/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getAndDeleteReq, postAndPatchReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateProject(){
    const {user, isLoading:authLoading} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const [isEdit , setIsEdit] = useState(false);
    const {projectId} = useParams();
    const router = useRouter();

    interface Project{
        name:string,
        description:string,
    }

    const handleisEdit = (e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        setIsEdit(!isEdit);
    }

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);

    useEffect(()=>{
        if(!projectId){
            return;
        }
        setIsLoading(true);
        const getProject = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/project/${projectId}` , "GET");
                if(response.success){
                    // console.log("response from updateProject! " , response);
                    setProjectData(response?.project);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                // console.error("error addProjectPage! " , error);
                toast.error(errorMessage);
            }finally{
               setIsLoading(false); 
            }
        }
        getProject();
    } , [projectId]);

    const [projectData , setProjectData] = useState<Project>({
        name:"",
        description:"",
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
            const response = await postAndPatchReq(`/api/project/${projectId}` , "PATCH" , projectData);
            // console.log(response);
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
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5 bg-base-300">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">UpdateProject</h1>
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
                    disabled={!isEdit} 
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
                    disabled={!isEdit}
                    required></textarea>
                    {
                        isEdit && (
                            <button 
                            type="submit" 
                            className="btn w-full mt-2 btn-neutral text-lg font-semibold shadow-xl rounded-2xl" 
                            disabled={isLoading}>{isLoading ? "Processing..." :"Save"}
                            </button>
                        )
                    }
                    {
                        projectData && !isEdit && (
                            <button
                            onClick={handleisEdit} 
                            type="button" 
                            className="btn w-full mt-2 btn-neutral text-lg font-semibold shadow-xl" 
                            disabled={isLoading}>{isLoading ? "Processing..." :"Edit"}
                            </button>
                        )
                    }
                    </form>
                </div>
            </div>
        </div>
    )
}