import { Issue } from "@/types/issue";

export default function UserInfo({issue}: {issue:Issue | null}){
    return(
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
                <tbody>
                    <tr>
                        <td className="font-medium">CreatedBy</td>
                        <td className="font-medium">{issue?.createdBy?.name ?? "TaskCreatedBy"}</td>
                        <td className="font-medium">{issue?.createdBy?.email ?? "TaskCreatedByEmail"}</td>
                        <td className="font-medium">{issue?.createdAt ? new Date(issue.createdAt).toDateString() : "N/A"}</td>
                    </tr>
                    <tr>
                        <td className="font-medium">AssignedBy</td>
                        <td className="font-medium">{issue?.assignedBy?.name ?? "N/A"}</td>
                        <td className="font-medium">{issue?.assignedBy?.email ?? "N/A"}</td>
                        <td className="font-medium">{issue?.assignedAt ? new Date(issue.assignedAt).toDateString(): "N/A"}</td>
                    </tr>
                    <tr>
                        <td className="font-medium">AssignedTo</td>
                        <td className="font-medium">{issue?.assignedTo?.name ?? "N/A"}</td>
                        <td className="font-medium">{issue?.assignedTo?.email ?? "N/A"}</td>
                        <td className="font-medium">{issue?.assignedAt ? new Date(issue.assignedAt).toDateString(): "N/A" }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}