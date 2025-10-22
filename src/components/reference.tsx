import { Issue } from "@/types/issue";

export default function Reference({issue}: {issue:Issue | null}){
    return(
        <div className="bg-base-300 shadow-lg rounded-lg space-y-2 px-3 py-6">
            <h1 className="border-b-2 border-b-gray-300 text-xl font-semibold">External-Reference</h1>
            <div className="space-y-1 space-x-1">
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
                                    {link.length > 10 ? link.slice(0, 40) + "..." : link}
                                </a>
                            </span>
                        )) 
                        : "No References are added"}
                    </span>
                </p>
                <p className="text-lg">Media:{" "} 
                    <span className="font-medium text-gray-700">
                        {issue?.attachments && issue.attachments.length > 0 ? 
                        issue.attachments.map((link)=>(
                            <span key={link}>
                                <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800">
                                    {link.length > 10 ? link.slice(0, 40) + "..." : link}
                                </a>
                            </span>
                        )) 
                        : "No Media is added"}
                    </span>
                </p>
            </div>
        </div>
    )
}