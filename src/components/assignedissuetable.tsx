import { Issue } from "@/types/issue";

export default function AssignedIssueTable({assignedIssues}: {assignedIssues:Issue[] | [] | undefined}){
    return(
        <div className="overflow-x-auto bg-base-300 shadow-lg rounded-lg w-full py-6 px-3 mb-6">
            <h1 className="text-center font-semibold text-xl">Assigned Tasks</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>status</th>
                        <th>Priority</th>
                        <th>overdue</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assignedIssues && assignedIssues.length > 0 ? assignedIssues.map((issue , index)=>(
                            <tr key={index}>
                                <td>{issue.name}</td>
                                <td>{issue.status}</td>
                                <td>{issue.priority}</td>
                                <td>{issue.duedate ? new Date(issue.duedate).toDateString() : "N/A"}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No assigned Tasks found.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}