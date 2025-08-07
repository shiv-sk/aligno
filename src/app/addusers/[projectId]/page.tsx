/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq, postAndPatchReq } from "@/apiCalls/apiCalls";
import AssignedusersTable from "@/components/assigneduserstable";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddUsers(){
    interface AllUsers{
        _id:string,
        name:string,
        email:string
    }
    const [allUsers , setAllUsers] = useState<AllUsers[]>([]);
    useEffect(()=>{
        const fetchAllUsers = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/user` , "GET");
                // console.log("all users are! " , response);
                setAllUsers(response?.users || []);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                // console.error("error from fetchAllUsers! " , error);
                alert(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        fetchAllUsers();
    } , [])
    const {projectId} = useParams<{projectId:string}>();
    const [addUserData , setAddUserData] = useState({
        userId:"",
        role:""
    });
    const [selectedusers , setSelectedUsers] = useState<{userId:string , role:string}[]>([]);
    const [isLoading , setIsLoading] = useState(false);

    const handleOnChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        setAddUserData({...addUserData , [e.target.name]:e.target.value})
    }

    const handleRemoveSelectedUser = async(user)=>{
        const userId = user?._id;
        const filteredUser = selectedusers.filter((user)=>(user.userId !== userId));
        setSelectedUsers([...filteredUser]);
        console.log("remove button is clicked!");
    }
    const handleAddUser = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!addUserData.userId || !addUserData.role){
            toast.error("select a user or role! ");
            return;
        }
        const existUser = selectedusers.some((user)=>user.userId === addUserData.userId);
        if(existUser){
            toast.error("user is alredy added! ");
            return;
        }
        try {
            setIsLoading(true);
            setSelectedUsers([...selectedusers , addUserData]);
            setAddUserData({userId:"" , role:""});
        } catch (error) {
            console.error("handle addUser Error!" , error);
        }finally{
            setIsLoading(false);
        }
    }
    const handleAssignUsers = async(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(!projectId){
            toast.error("ProjectId is missing! ");
            return;
        }
        if(!selectedusers){
            toast.error("users and roles are not selected! ");
            return;
        }
        const dataToSend = selectedusers.map((user)=>({
            ...user,
            projectId
        }));
        try {
            const response = await postAndPatchReq(`/api/projectmember` , "POST" , dataToSend);
            console.log("response from add users! " , response);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error addProjectPage! " , error);
            toast.error(errorMessage);
        }
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5 bg-base-300">
            <div className="md:w-[400px] w-full p-6 rounded-xl shadow-xl bg-base-100 w-96">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Add Users</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleAddUser}>
                    <label htmlFor="name" className="text-md font-medium">Select User</label>    
                    <select value={addUserData.userId} className="select w-full" name="userId" id="name" onChange={handleOnChange}>
                        <option>Select a user</option>
                        {
                            allUsers && allUsers.length > 0 ? allUsers.map((user)=>(
                                <option value={user._id} key={user._id}>{user.name}</option>
                            )) : ""
                        }
                    </select>
                    <label htmlFor="role" className="text-md font-medium mb-1">Select Role</label>
                    <select value={addUserData.role} className="select w-full" name="role" id="role" onChange={handleOnChange}>
                        <option>Select a Role</option>
                        <option value={"Manager"}>Manager</option>
                        <option value={"TeamLead"}>TeamLead</option>
                        <option value={"Employee"}>Employee</option>
                    </select>
                    <button 
                    type="submit" 
                    className="btn w-full btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>{isLoading ? "Processing..." :"Add Users"}</button>
                    </form>
                </div>
            </div>
            <div className="bg-base-100 rounded-xl py-4 px-1.5 md:shadow-xl w-96">
                <h3 className="text-center py-2.5 px-4 text-lg">Selected Users</h3>
                <div className="overflow-x-auto">
                    <table className="table table-sm md:table-md min-w-full divide-y divide-neutral-200">
                        <thead>
                            <tr>
                                <th className="font-black text-sm">Name</th>
                                <th className="font-black text-sm">Email</th>
                                <th className="font-black text-sm">Role</th>
                                <th className="font-black text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedusers && selectedusers.length > 0 ? selectedusers.map((selectedUser)=>{
                                    const user = allUsers.find((u)=>u._id === selectedUser.userId);
                                    let badgeColor;
                                    switch(selectedUser?.role){
                                        case "Manager":
                                            badgeColor = "badge badge-neutral text-center mt-2.5 font-semibold";
                                            break;
                                        case "TeamLead":
                                            badgeColor = "badge badge-info text-center mt-2.5 font-semibold";
                                            break;
                                        case "Employee":
                                            badgeColor = "badge badge-secondary text-center mt-2.5 font-semibold ";
                                            break;
                                        default:
                                            badgeColor = "badge badge-secondary text-center mt-2.5 font-semibold ";
                                    }
                                    return(
                                        <tr key={selectedUser.userId}>
                                            <td>{user?.name || "userName"}</td>
                                            <td>{user?.email || "userEmail"}</td>
                                            <td className={`${badgeColor}`}>{selectedUser?.role || "Role"}</td>
                                            <td onClick={()=>handleRemoveSelectedUser(user)}>{"remove"}</td>
                                        </tr>
                                    )
                                }) : 
                                <tr>
                                    <td colSpan={4} className="text-center py-4">No Users are Selected!</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <button 
            type="button" 
            className="btn w-full btn-neutral text-lg font-semibold shadow-xl max-w-sm"
            onClick={handleAssignUsers} 
            disabled={isLoading}>{isLoading ? "Processing..." :"Assign Users"}</button>
            <div>
                <AssignedusersTable projectId={projectId}/>
            </div>
        </div>
    )
}