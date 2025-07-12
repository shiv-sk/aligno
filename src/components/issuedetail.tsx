// import Issue from "@/types/issueData";

export default function Issuedetail(){
    return(
        <div className="bg-base-100 shadow-lg rounded-lg space-y-6 px-3 py-6 md:w-[600] w-96">
            <div className="bg-base-300 shadow-lg rounded-lg space-y-2 px-3 py-6">
                <h1 className="border-b-2 border-b-gray-300 text-xl font-semibold">Task-Info</h1>
                <div className="space-y-1 space-x-1">
                    <h2 className="text-center text-xl font-semibold">TaskName</h2>
                    <p className="text-lg">Description: 
                        <span className="font-medium text-gray-700">description</span>
                    </p>
                    <p className="text-lg">Project: 
                        <span className="font-medium text-gray-700">projectName</span>
                    </p>
                    <p className="text-lg">CompletedAt: 
                        <span className="font-medium text-gray-700">Completion Date</span>
                    </p>
                </div>
            </div>
            <div className="overflow-x-auto bg-base-200 shadow-lg rounded-lg space-y-2 px-4 py-6">
                <h1 className="border-b-2 border-b-gray-300 text-xl font-semibold">User-Info</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="font-medium text-lg text-primary">User</th>
                            <th className="font-medium text-lg text-primary">name</th>
                            <th className="font-medium text-lg text-primary">email</th>
                            <th className="font-medium text-lg text-primary">Event Date</th>
                        </tr>
                    </thead>
                    <tr>
                        <td className="font-medium">CreatedBy</td>
                        <td className="font-medium">userOne</td>
                        <td className="font-medium">userOne@email.com</td>
                        <td className="font-medium">0000/00/00</td>
                    </tr>
                    <tr>
                        <td>AssignedBy</td>
                        <td>userTwo</td>
                        <td>userTwo@email.com</td>
                        <td>0000/00/00</td>
                    </tr>
                    <tr>
                        <td>AssignedTo</td>
                        <td>userThree</td>
                        <td>userThree@email.com</td>
                        <td>0000/00/00</td>
                    </tr>
                </table>
            </div>
            <div className="bg-base-100 shadow-lg rounded-lg space-y-2 px-3 py-6">
                <h1 className="border-b-2 border-b-gray-300 text-xl font-semibold">Issue-Summary</h1>
                <div 
                className="flex flex-col gap-2.5 md:gap-2 md:flex-row md:justify-evenly md:items-center">
                    <div className="font-medium text-xl">Status: 
                        <span className="badge badge-info">Assigned</span>
                    </div>
                    <div className="font-medium text-xl">Duedate: 
                        <span className="badge badge-error">0000/00/00</span>
                        <div className="tooltip" data-tip="task is Overdue">
                            <span className="badge badge-error ml-1">Overdue</span>
                        </div>
                    </div>
                    <div className="font-medium text-xl">Priority: 
                        <span className="badge badge-error">High</span>
                    </div>
                </div>
                
            </div>
            <div className="flex justify-center items-center gap-3">
                <button className="btn btn-primary">Unassign</button>
                <button className="btn btn-primary">Claim</button>
            </div>
        </div>
    )
}