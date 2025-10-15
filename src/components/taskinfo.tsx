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
                <p className="text-lg">References:{" "} 
                    <span className="font-medium text-gray-700">
                        {issue?.links && issue.links.length > 0 ? 
                        issue.links.map((link)=>(
                            <span key={link}>
                                <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800">
                                    {link.length > 40 ? link.slice(0, 40) + "..." : link}
                                </a>
                            </span>
                        )) 
                        : "No References are added"}
                    </span>
                </p>
            </div>
        </div>
    )
}