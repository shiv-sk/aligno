import userSummary from "@/types/usersummary";

export default function UserSummary({userSummary} : {userSummary: userSummary}){
    function setOverdueStatement(){
        const completionRate = userSummary?.completionRate ?? 0;
        if(userSummary.highProrityIssues >= 3 && completionRate < 40){
            return(
                <div className="tooltip" data-tip="User is currently overloaded.">
                    <span className="badge badge-error">Hover me</span>
                </div>
            )
        }
        else if(userSummary.highProrityIssues >= 1 && completionRate <= 50){
            return(
                <div className="tooltip" data-tip="User must focus on current work.">
                    <span className="badge badge-accent">Hover me</span>
                </div>
            )
        }
        else{
           return(
                <div className="tooltip" data-tip="User can handle">
                    <span className="badge badge-info">Hover me</span>
                </div>
            ) 
        }
    }
    return(
        <div className="space-y-1 py-6 px-3 overflow-y-auto overflow-x-auto bg-base-100 shadow-md rounded-xl w-full space-y-1.5">
            <h1 className="text-center font-bold text-lg">User Progress and WorkLoad</h1>
            <div className="space-y-1 py-3 px-3 flex flex-wrap justify-center bg-base-100 w-full space-y-1.5 gap-3">
                <div className="flex flex-col justify-center items-center shadow-lg py-6 px-3 rounded-lg h-[100px] w-[180px]">
                    <p className="text-lg">Assigned Tasks</p>
                    <p className="text-base text-lg badge badge-accent">{userSummary.totalIssues ?? "AssignedTask"}</p>
                </div>
                <div className="flex flex-col justify-center items-center shadow-lg py-6 px-3 rounded-lg h-[100px] w-[180px]">
                    <p className="text-lg">on Working Tasks</p>
                    <p className="text-base text-lg badge badge-info">{userSummary.onWorkingIssues ?? "OnWorkingTask"}</p>
                </div>
                <div className="flex flex-col justify-center items-center shadow-lg py-6 px-3 rounded-lg h-[100px] w-[180px]">
                    <p className="text-lg">Completed Tasks</p>
                    <p className="text-base text-lg badge badge-success">{userSummary.completedIssues ?? "CompletedTask"}</p>
                </div>
                <div className="flex flex-col justify-center items-center shadow-lg py-6 px-3 rounded-lg h-[100px] w-[180px]">
                    <p className="text-lg">Overdue Tasks</p>
                    <p className="text-base text-lg badge badge-warning">{userSummary.overdueIssues ?? "OverdueTasks"}</p>
                </div>
                <div className="flex flex-col justify-center items-center shadow-lg py-6 px-3 rounded-lg h-[100px] w-[180px]">
                    <p className="text-lg">High Priority Tasks</p> 
                    <p className="text-base text-lg badge badge-error">{userSummary.highProrityIssues ?? "HighPriorityTasks"}</p>
                </div>
                <div className="flex flex-col justify-center items-center shadow-lg py-6 px-3 rounded-lg h-[100px] w-[180px]">
                    <p className="text-lg">Completion Rate</p> 
                    <p className="text-base text-lg badge badge-success">{userSummary.completionRate ?? "HighPriorityTasks"}%</p>
                </div>
            </div>
            <div className="px-3">
                <progress className="progress progress-success w-full" 
                    value={userSummary.completedIssues} 
                    max={userSummary.totalIssues}>
                </progress>
                {`${userSummary.completedIssues} of ${userSummary.totalIssues} tasks completed`}
                <div className="text-base text-lg">Summary: {setOverdueStatement()}</div>
            </div>
        </div>
    )
}