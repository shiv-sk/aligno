import userSummary from "@/types/usersummary";

export default function UserSummary({userSummary} : {userSummary: userSummary}){
    function setOverdueStatement(){
        if(!userSummary?.highProrityIssues){
            return;
        }
        const completionRate = userSummary?.completionRate ?? 0;
        if(userSummary.highProrityIssues >= 3 && completionRate < 40){
            return(
                <div className="tooltip" data-tip="User is currently overloaded.">
                    <span className="badge badge-error">Summary</span>
                </div>
            )
        }
        else if(userSummary.highProrityIssues >= 1 && completionRate <= 50){
            return(
                <div className="tooltip" data-tip="User must focus on current work.">
                    <span className="badge badge-accent">Summary</span>
                </div>
            )
        }
        else{
           return(
                <div className="tooltip" data-tip="User can handle">
                    <span className="badge badge-info">Summary</span>
                </div>
            ) 
        }
    }
    return(
        <div className="space-y-1 py-6 px-3 md:h-[250px] overflow-y-auto overflow-x-auto bg-base-100 shadow-md rounded-xl md:w-1/2 space-y-1.5">
            <h1 className="text-center font-bold text-lg">User Progress and WorkLoad</h1>
            <p className="text-lg badge badge-accent">Assigned Tasks: 
                <span className="text-base">{userSummary.totalIssues ?? "AssignedTask"}</span>
            </p>
            <p className="text-lg badge badge-info">on Working Tasks: 
                <span className="text-base">{userSummary.onWorkingIssues ?? "OnWorkingTask"}</span>
            </p>
            <p className="text-lg badge badge-success">Completed Tasks: 
                <span className="text-base">{userSummary.completedIssues ?? "CompletedTask"}</span>
            </p>
            <p className="text-lg badge badge-warning">Overdue Tasks: 
                <span className="text-base">{userSummary.overdueIssues ?? "OverdueTasks"}</span>
            </p>
            <div className="text-lg badge badge-primary">High Priority Tasks: 
                <span className="text-basel">{userSummary.highProrityIssues ?? "HighPriorityTasks"}</span>
            </div>
            <p className="text-lg">Completion Rate:
                <span className="text-base">{userSummary.completionRate ?? "HighPriorityTasks"}%</span> 
                <progress className="progress progress-success w-full" 
                    value={userSummary.completedIssues} 
                    max={userSummary.totalIssues}>
                </progress>
                {`${userSummary.completedIssues} of ${userSummary.totalIssues} tasks completed`}
            </p>
            <span className="px-18 text-base text-center">{setOverdueStatement()}</span>
        </div>
    )
}