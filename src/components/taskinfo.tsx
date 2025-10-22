import { Issue } from "@/types/issue";

export default function TaskInfo({issue}: {issue:Issue | null}){
    return(
        <div className="bg-base-300 shadow-lg rounded-lg space-y-2 px-3 py-6">
            <h1 className="border-b-2 border-b-gray-300 text-xl font-semibold">Task-Info</h1>
            <div className="space-y-1 space-x-1">
                <h2 className="text-center text-xl font-semibold">{issue?.name || "TaskName"}</h2>
                <p className="text-lg">Description: 
                    <span className="font-medium text-gray-700">
                        {issue?.description || "TaskDescription"}
                    </span>
                </p>
                <p className="text-lg">Project: 
                    <span className="font-medium text-gray-700">
                        {issue?.projectId?.name || "ProjectName"}
                    </span>
                </p>
                <p className="text-lg">CompletedAt: 
                    <span className="font-medium text-gray-700">
                        {issue?.completedAt ? new Date(issue.completedAt).toDateString():"N/A"}
                    </span>
                </p>
            </div>
        </div>
    )
}